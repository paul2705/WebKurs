const INIT_SIZE={Height:10,Width:10};
const INIT_CROWN_COUNT=10;
const INIT_BLOCK_COUNT=20;
const INIT_BOOM_COUNT=5;
const INIT_BARB_COUNT=10;
const INIT_SCORE=20;

const SelectMap=document.querySelector('.Map');
const SelectStartButton=document.querySelector('.Start');
const SelectScore=document.querySelector('.Score');
const SelectTime=document.querySelector('.Time');
let IsActive=false;
let Position={ManX:0,ManY:0};
let Score=0,HitCrownCount=INIT_CROWN_COUNT;
let Time=0;

const IsBound = (Position) =>{
    /* Check if robot's Position is out of bound or robot walk to a block
    Position:{Height,Width}*/
    let BoolX=Position.ManX>=0&&Position.ManX<INIT_SIZE.Height;
    let BoolY=Position.ManY>=0&&Position.ManY<INIT_SIZE.Width;
    let BoolBlock=false;
    if (Map[Position.ManX][Position.ManY]!=null) BoolBlock=Map[Position.ManX][Position.ManY].Block;
    return BoolX&&BoolY&&!BoolBlock;
}

const InitMap = (Size,PrizeCount,BlockCount,BarbCount,BoomCount,Score) =>{
    /* Making a Map with Crowns, Blocks, Barbs and Booms
    Size: {Height,Width}
    ...Count: the number of ...
    Score: a interval [1,score] for Score of each Crown and Deduction of each Barb */
    let Map=new Array();
    for (let i=0;i<Size.Height;i++){
        Map[i]=new Array();
        for (let j=0;j<Size.Width;j++) Map[i][j]=null;
    }
    while (PrizeCount>0){
        let MapX=Math.floor(Math.random()*Size.Width);
        let MapY=Math.floor(Math.random()*Size.Height);
        if (Map[MapX][MapY]==null&&MapX+MapY!==0){
            Map[MapX][MapY]={ Bonus: Math.floor(Math.random()*Score+1), Block: false, Barb: -1, Boom: false };
            PrizeCount--;
        }
    }
    while (BlockCount>0){
        let MapX=Math.floor(Math.random()*Size.Width);
        let MapY=Math.floor(Math.random()*Size.Height);
        if (Map[MapX][MapY]==null&&MapX+MapY!==0){
            Map[MapX][MapY]={ Bonus: -1, Block: true, Barb: -1, Boom: false };
            BlockCount--;
        }
    }
    while (BarbCount>0){
        let MapX=Math.floor(Math.random()*Size.Width);
        let MapY=Math.floor(Math.random()*Size.Height);
        let Tmp=Math.floor(Math.random()*Score);
        if (Map[MapX][MapY]==null&&MapX+MapY!==0){
            Map[MapX][MapY]={ Bonus: -1, Block: false, Barb: Tmp, Boom: false };
            BarbCount--;
        }
    }
    while (BoomCount>0){
        let MapX=Math.floor(Math.random()*Size.Width);
        let MapY=Math.floor(Math.random()*Size.Height);
        if (Map[MapX][MapY]==null&&MapX+MapY!==0){
            Map[MapX][MapY]={ Bonus: -1, Block: false, Barb: -1, Boom: true };
            BoomCount--;
        }
    }
    return Map;
}

const DrawMap = (Map,Size) =>{
    /* Draw the Map with Crowns 
    Map: null: Nothing; Bonus>=0: Prize; Barb>=0: Barb; Block===true; Boom===true;
    Size: {Height,Width}
    */
    for (let i=0;i<Size.Height;i++){
        const Row=document.createElement('div');
        Row.setAttribute('class','Row');
        SelectMap.appendChild(Row);
        for (let j=0;j<Size.Height;j++){
            const Cell=document.createElement('div');
            Cell.setAttribute('class','Cell');
            if (Map[i][j]===null){
                Row.appendChild(Cell);
                continue;
            }
            if (Map[i][j].Bonus>=0){
                const Img=document.createElement('img');
                Img.setAttribute('src','../image/prize.svg');
                Img.setAttribute('class','Prize');
                Cell.appendChild(Img);
            }
            if (Map[i][j].Block){
                const Img=document.createElement('img');
                Img.setAttribute('src','../image/block.svg');
                Img.setAttribute('class','Block');
                Cell.appendChild(Img);
            }
            if (Map[i][j].Boom){
                const Img=document.createElement('img');
                Img.setAttribute('src','../image/boom.svg');
                Img.setAttribute('class','Boom');
                Cell.appendChild(Img);
            }
            if (Map[i][j].Barb>=0){
                const Img=document.createElement('img');
                Img.setAttribute('src','../image/barb.svg');
                Img.setAttribute('class','Barb');
                Cell.appendChild(Img);
            }
            Row.appendChild(Cell);
        }
    }
}

const DrawMan = (Position) =>{
    /* Draw a robot on point Position:{X,Y} in the Map
    X: x-axis (Height), Y: y-axis (Width)*/
    let X=Position.ManX,Y=Position.ManY;
    X++; Y++;
    const TmpImg=document.querySelector('.Row:nth-child('+X+') .Cell:nth-child('+Y+') img');
    if (TmpImg===null){
        const TmpCell=document.querySelector('.Row:nth-child('+X+') .Cell:nth-child('+Y+')');
        const NewImg=document.createElement('img');
        NewImg.setAttribute('src','../image/robot.svg');
        NewImg.setAttribute('class','Man');
        TmpCell.appendChild(NewImg);
    }
    else {
        TmpImg.setAttribute('src','../image/robot.svg');
        TmpImg.setAttribute('class','Man');
    }
}

const DeleteMan = (Position) =>{
    /* Delete a robot on point Position:{X,Y} in the Map
    X: x-axis (Height), Y: y-axis (Width)*/
    let X=Position.ManX,Y=Position.ManY;
    X++; Y++;
    const TmpImg=document.querySelector('.Row:nth-child('+X+') .Cell:nth-child('+Y+') img');
    TmpImg.remove();
}

const CountScore = (Position) =>{
    /* Count the Score and Check whether the Game is over or not
    Position:{Height,Width}*/
    let X=Position.ManX,Y=Position.ManY;
    if (Map[X][Y]!=null){
        if (Map[X][Y].Bonus>=0){
            Score+=Map[X][Y].Bonus;
            Map[X][Y]=null;
            HitCrownCount--;
        }
        else if (Map[X][Y].Barb>=0){
            Score-=Map[X][Y].Barb;
            Map[X][Y]=null;
        }
        else if (Map[X][Y].Boom){
            clearInterval(Timer);
            alert("You Lose!");
        }
    }
    SelectScore.textContent='Score: '+Score;
    if (HitCrownCount===0){
        clearInterval(Timer);
        alert("You Win!");
    }
}

const ActiveStartButton = () =>{
    /* Activate the Start Button, let the Game Start*/
    SelectStartButton.onclick = () =>{ 
        if (IsActive===false) IsActive=true; 
        else {
            StartGame();
        }
    }
}

document.onkeydown = (Event) =>{
    /* Monitor the keyboard, let robot move reacting with Key {Right,Up,Left,Down}
    IsActive: false/true, check if the Game is Started*/
    if (!IsActive) return;
    let PrePos={...Position};
    switch (Event.code){
        case 'ArrowRight': Position.ManY++; break;
        case 'ArrowUp': Position.ManX--; break;
        case 'ArrowLeft': Position.ManY--; break;
        case 'ArrowDown': Position.ManX++; break;
        default: return;
    }
    if (IsBound(Position)){
        DeleteMan(PrePos);
        DrawMan(Position);
    }
    else Position={...PrePos};
    CountScore(Position);
}

const CountTime = () =>{
    /* Count the Time 1s by 1s */
    if (!IsActive) return;
    Time++;
    SelectTime.textContent='Time: '+Time+'s';
}

let Map=InitMap(INIT_SIZE,INIT_CROWN_COUNT,INIT_BLOCK_COUNT,INIT_BARB_COUNT,INIT_BOOM_COUNT,INIT_SCORE);

DrawMap(Map,INIT_SIZE);
DrawMan(Position);
ActiveStartButton();
let Timer=setInterval(CountTime,1000);

console.log(Map);