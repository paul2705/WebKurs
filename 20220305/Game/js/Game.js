const INIT_SIZE={Height:10,Width:10};
const INIT_COUNT=10;
const INIT_SCORE=10;

const SelectMap=document.querySelector('.Map');
const SelectStartButton=document.querySelector('.Start');
const SelectScore=document.querySelector('.Score');
const SelectTime=document.querySelector('.Time');
let IsActive=false;
let Position={ManX:0,ManY:0};
let Score=0;
let Time=0;

const IsBound = (Position) =>{
    /* Check if robot's Position is out of bound
    Position:{Height,Width}*/
    let BoolX=Position.ManX>=0&&Position.ManX<INIT_SIZE.Height;
    let BoolY=Position.ManY>=0&&Position.ManY<INIT_SIZE.Width;
    return BoolX&&BoolY;
}

const InitMap = (Size,Count,Score) =>{
    /* Making a Map with Crowns
    Size: {Height,Width}
    Count: the number of Crowns
    Score: the score of each Crown */
    let Map=new Array();
    let Ratio=Count/(Size.Width*Size.Height);
    for (let i=0;i<Size.Height;i++){
        Map[i]=new Array();
        for (let j=0;j<Size.Width;j++){
            let Tmp=Math.random();
            if (Tmp>1-Ratio&&Count>0&&i+j!==0){
                Map[i][j]={ Bonus: Score };
                Count--;
            }
            else Map[i][j]=null;
        }
    }
    while (Count>0){
        let MapX=Math.floor(Math.random()*Size.Width);
        let MapY=Math.floor(Math.random()*Size.Height);
        if (Map[MapX][MapY]==null&&MapX+MapY!==0){
            Map[MapX][MapY]={ Bonus: Score };
            Count--;
        }
    }
    return Map;
}

const DrawMap = (Map,Size) =>{
    /* Draw the Map with Crowns 
    Map: null: no Crown; {bonus:...} have a Crown
    Size: {Height,Width}
    */
    for (let i=0;i<Size.Height;i++){
        const Row=document.createElement('div');
        Row.setAttribute('class','Row');
        SelectMap.appendChild(Row);
        for (let j=0;j<Size.Height;j++){
            const Block=document.createElement('div');
            Block.setAttribute('class','Block');
            if (Map[i][j]!==null){
                const Img=document.createElement('img');
                Img.setAttribute('src','../image/prize.svg');
                Block.appendChild(Img);
            }
            Row.appendChild(Block);
        }
    }
}

const DrawMan = (Position) =>{
    /* Draw a robot on point Position:{X,Y} in the Map
    X: x-axis (Height), Y: y-axis (Width)*/
    let X=Position.ManX,Y=Position.ManY;
    X++; Y++;
    const TmpImg=document.querySelector('.Row:nth-child('+X+') .Block:nth-child('+Y+') img');
    if (TmpImg===null){
        const TmpBlock=document.querySelector('.Row:nth-child('+X+') .Block:nth-child('+Y+')');
        const NewImg=document.createElement('img');
        NewImg.setAttribute('src','../image/robot.svg');
        TmpBlock.appendChild(NewImg);
    }
    else {
        TmpImg.setAttribute('src','../image/robot.svg');
    }
}

const DeleteMan = (Position) =>{
    /* Delete a robot on point Position:{X,Y} in the Map
    X: x-axis (Height), Y: y-axis (Width)*/
    let X=Position.ManX,Y=Position.ManY;
    X++; Y++;
    const TmpImg=document.querySelector('.Row:nth-child('+X+') .Block:nth-child('+Y+') img');
    TmpImg.remove();
}

const CountScore = (Position) =>{
    /* Count the Score and Check whether the Game is over or not
    Position:{Height,Width}*/
    let X=Position.ManX,Y=Position.ManY;
    if (Map[X][Y]!==null){
        Score+=Map[X][Y].Bonus;
        Map[X][Y]=null;
    }
    SelectScore.textContent='Score: '+Score;
    if (Score===100){
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

let Map=InitMap(INIT_SIZE,INIT_COUNT,INIT_SCORE);
DrawMap(Map,INIT_SIZE);
DrawMan(Position);
ActiveStartButton();
let Timer=setInterval(CountTime,1000);

console.log(Map);