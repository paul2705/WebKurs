const Net=require('net');
const EventEmitter=require('events');

const STATE={ START:0, HEAD:1, BODY:2, END:3 };

class _RHead{ 
    Version; Server; Len; 
    EnCode(Version,Server,Len){
        this.Version=Version;
        this.Server=Server;
        this.Len=Len;
    }
    ToString(){ 
        let TmpVer=Buffer.alloc(4); TmpVer.writeUInt32BE(this.Version);
        let TmpSer=Buffer.alloc(4); TmpSer.writeUInt32BE(this.Server);
        let TmpLen=Buffer.alloc(4); TmpLen.writeUInt32BE(this.Len);
        return Buffer.concat([TmpVer,TmpSer,TmpLen]);
    }
    DeCode(TmpHead){
        if (TmpHead.length<12) return false;
        this.Version=TmpHead.readUInt32BE();
        this.Server=TmpHead.readUInt32BE(4);
        this.Len=TmpHead.readUInt32BE(8);
        return true;
    }
    Print(){ console.log('\t Head: \n',
                        '\t\tVersion: ',this.Version,
                        '\n\t\tServer: ',this.Server,
                        '\n\t\tLen: ',this.Len); 
    }
};

class _RBody{ 
    Data; 
    EnCode(Data){ this.Data=Data; }
    Length(){ return this.Data.length; }
    ToString(){ return Buffer.from(this.Data); }
    DeCode(TmpBody,TmpLen){
        if (TmpBody.length!==TmpLen) return false;
        this.Data=JSON.parse(TmpBody.toString('utf-8'));
        return true;
    }
    Print(){ console.log('\t Body: ',this.Data); }
};

class _Msg{ 
    RHead=new _RHead(); RBody=new _RBody(); 
    EnCode(Version,Server,Data){
        this.RBody.EnCode(Data);
        this.RHead.EnCode(Version,Server,this.RBody.Length());
    }
    ToString(){ return Buffer.concat([this.RHead.ToString(),this.RBody.ToString()]); }
    DeCode(TmpMsg){
        if (this.RHead.DeCode(TmpMsg.slice(0,12))&&
            this.RBody.DeCode(TmpMsg.slice(12),this.RHead.Len)) return true;
        else return false;
    }
    Print(){ this.RHead.Print(); this.RBody.Print(); }
};


class Request extends EventEmitter{
    Msg=new _Msg();
    State=STATE.START;
    EnCode(Version,Server,Data){ this.Msg.EnCode(Version,Server,Data); this.State=STATE.END; }
    ToString(){ return this.Msg.ToString(); }
    DeCode(TmpMsg){ 
        if (this.Msg.DeCode(TmpMsg)){
            this.State=STATE.END;
            this.emit('Receive');
            return true;
        } else return false;
    }
    Print(){ this.Msg.Print(); }
}



function __Test(){
    Req=new Request();
    Req.EnCode(1,1,JSON.stringify({hello: 'world'}));
    console.log(Req.ToString());
    Rev=new Request();
    console.log(Rev.DeCode(Req.ToString()));
    console.log(Rev.Msg.RHead.Version,Rev.Msg.RHead.Server,Rev.Msg.RHead.Len,Rev.Msg.RBody.Data);
}
// __Test();



Net.createServer((Server)=>{
    let Req=new Request();
    Req.on('Receive',()=>{
        console.log('Server Receive Message:'); Req.Print();
        Req.EnCode(1,1,JSON.stringify({respond: true, data: 2022}));
        Server.write(Req.ToString());
    })
    Server.on('data',(TmpMsg)=>{
        Req.DeCode(TmpMsg);
    });
    Server.on('end',()=>{
        Req=null;
    });
}).listen(10000);

setTimeout(()=>{
    const Socket=Net.connect(10000);
    Socket.on('connect',()=>{
        Req=new Request();
        Req.EnCode(1,1,JSON.stringify({hello: 'world'}));
        Socket.write(Req.ToString());
        Req.on('Receive',()=>{
            console.log('Client Receive Message:'); Req.Print();
        });
        Socket.on('data',(TmpMsg)=>{
            Req.DeCode(TmpMsg);
        })
        Socket.on('end',()=>{
            Req=null;
        })
    });
},3000);