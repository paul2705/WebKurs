const INIT_SIZE={Width:10,Height:10};
const INIT_COUNT=10;
const INIT_SCORE=10;

const InitMap = (Size,Count,Score) =>{
    /* Making a Map with Crowns
    Size: {Width,Height}
    Count: the number of Crowns
    Score: the score of each Crown */
    let Map=new Array();
    let Ratio=Count/(Size.Width*Size.Height);
    for (let i=0;i<Size.Width;i++){
        Map[i]=new Array();
        for (let j=0;j<Size.Width;j++){
            let Tmp=Math.random();
            if (Tmp>1-Ratio&&Count>0){
                Map[i][j]={ Bonus: Score };
                Count--;
            }
            else Map[i][j]=null;
        }
    }
    while (Count>0){
        let MapX=Math.floor(Math.random()*Size.Width);
        let MapY=Math.floor(Math.random()*Size.Height);
        if (Map[MapX][MapY]==null){
            Map[MapX][MapY]={ Bonus: Score };
            Count--;
        }
    }
    return Map;
}

Map=InitMap(INIT_SIZE,INIT_COUNT,INIT_SCORE);
console.log(Map);