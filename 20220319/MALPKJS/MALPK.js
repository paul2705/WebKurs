const Net=require('net');
const EventEmitter=require('events');

const STATE={ START:0, HEAD:1, BODY:2, END:3 };

class _RHead{ 
    /* the section for Head of Msg
    Version: the Version of protocol,
    Server: the Number of Server,
    Len: the Length of the Data */
    Version; Server; Len; 
    EnCode(Version,Server,Len){ 
        /* initiate the data of MsgHead */
        this.Version=Version;
        this.Server=Server;
        this.Len=Len;
    }
    ToString(){ 
        /* dump the data to a String(Buffer) with big-endian */
        let TmpVer=Buffer.alloc(4); TmpVer.writeUInt32BE(this.Version);
        let TmpSer=Buffer.alloc(4); TmpSer.writeUInt32BE(this.Server);
        let TmpLen=Buffer.alloc(4); TmpLen.writeUInt32BE(this.Len);
        return Buffer.concat([TmpVer,TmpSer,TmpLen]);
    }
    DeCode(TmpHead){ 
        /* initiate the data of MsgHead by Reading a string 
        TmpHead: a String(Buffer) contains Version, Server, Len with big-endian
        return false means error meets during Decoding */
        if (TmpHead.length<12) return false;
        this.Version=TmpHead.readUInt32BE();
        this.Server=TmpHead.readUInt32BE(4);
        this.Len=TmpHead.readUInt32BE(8);
        return true;
    }
    Print(){ 
        /* Debug mood */
        console.log('\t Head: ',
                        '\n\t\tVersion: ',this.Version,
                        '\n\t\tServer: ',this.Server,
                        '\n\t\tLen: ',this.Len); 
    }
};

class _RBody{ 
    /* the section for Body of Msg 
    Data: the Data of MsgBody */
    Data; 
    EnCode(Data){ 
        /* initiate the Data of MsgBody with a string including JS-Struct */ 
        this.Data=JSON.stringify(Data); 
    }
    Length(){ 
        /* return the Length of Data */
        return this.Data.length; 
    }
    ToString(){ 
        /* dump the Data-String to a String(Buffer) */
        return Buffer.from(this.Data); 
    }
    DeCode(TmpBody,TmpLen){
        /* initiate the Data of MsgBody by Reading a string 
        TmpHead: a String(Buffer) contains Data 
        return false means error meets during Decoding */
        if (TmpBody.length!==TmpLen) return false;
        this.Data=JSON.parse(TmpBody.toString('utf-8'));
        return true;
    }
    Print(){ 
        /* Debug mood */
        console.log('\t Body: ',this.Data); 
    }
};

class _Msg{ 
    /* the section integrating Head and Body of a Msg */
    RHead=new _RHead(); RBody=new _RBody(); 
    EnCode(Version,Server,Data){
        /* initiate the data of the whole Msg
        Version: the Version of protocol
        Server: the Number of Server
        Data: the Data of Msg */
        this.RBody.EnCode(Data);
        this.RHead.EnCode(Version,Server,this.RBody.Length());
    }
    ToString(){ 
        /* dump the Msg to a String(Buffer) */
        return Buffer.concat([this.RHead.ToString(),this.RBody.ToString()]); 
    }
    DeCode(TmpMsg){
        /* decode the whole Msg with a String(Buffer)
        return false means error meets during Decoding */
        return (this.RHead.DeCode(TmpMsg.slice(0,12))&&
                this.RBody.DeCode(TmpMsg.slice(12),this.RHead.Len));
    }
    Print(){ 
        /* debug mood */
        this.RHead.Print(); this.RBody.Print(); 
    }
};


class Request extends EventEmitter{
    /* the section integrating Msg and welcoming Event-Module */
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
    /* debug mood */
    Req=new Request();
    Req.EnCode(1,1,JSON.stringify({hello: 'world'}));
    console.log(Req.ToString());
    Rev=new Request();
    console.log(Rev.DeCode(Req.ToString()));
    console.log(Rev.Msg.RHead.Version,Rev.Msg.RHead.Server,Rev.Msg.RHead.Len,Rev.Msg.RBody.Data);
}
// __Test();


/* create a Server using net-Module */
Net.createServer((Server)=>{
    let Req=new Request();
    Req.on('Receive',()=>{
        console.log('Server Receive Message:'); Req.Print();
        Req.EnCode(1,1,{respond: true, data: 'Paul120090105'});
        Server.write(Req.ToString());
    });
    Server.on('data',(TmpMsg)=>{ Req.DeCode(TmpMsg); });
    Server.on('end',()=>{ Req=null; });
}).listen(5000);

/* create a Socket sending Msg to the Server */
setTimeout(()=>{
    const Socket=Net.connect(5000);
    Socket.on('connect',()=>{

        Req=new Request();
        Req.EnCode(1,1,{hello: 'world'});
        Socket.write(Req.ToString());

        Req.on('Receive',()=>{
            console.log('Client Receive Message:'); Req.Print();
        });
        Socket.on('data',(TmpMsg)=>{ Req.DeCode(TmpMsg); });
        Socket.on('end',()=>{ Req=null; });
    });
},3000);
