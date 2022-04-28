var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var INIT_SIZE = { Height: 10, Width: 10 };
var INIT_CROWN_COUNT = 10;
var INIT_BLOCK_COUNT = 20;
var INIT_BOOM_COUNT = 5;
var INIT_BARB_COUNT = 10;
var INIT_SCORE = 20;
var SelectTMap = document.querySelector('.Map');
var SelectStartButton = document.querySelector('.Start');
var SelectScore = document.querySelector('.Score');
var SelectTime = document.querySelector('.Time');
var IsActive = false;
var Position = { ManX: 0, ManY: 0 };
var Score = 0, HitCrownCount = INIT_CROWN_COUNT;
var Time = 0;
var IsBound = function (Position) {
    /* Check if robot's Position is out of bound or robot walk to a block
    Position:{Height,Width}*/
    var BoolX = Position.ManX >= 0 && Position.ManX < INIT_SIZE.Height;
    var BoolY = Position.ManY >= 0 && Position.ManY < INIT_SIZE.Width;
    var BoolBlock = false;
    if (TMap[Position.ManX][Position.ManY] != null)
        BoolBlock = TMap[Position.ManX][Position.ManY].Block;
    return BoolX && BoolY && !BoolBlock;
};
var InitTMap = function (Size, PrizeCount, BlockCount, BarbCount, BoomCount, Score) {
    /* Making a TMap with Crowns, Blocks, Barbs and Booms
    Size: {Height,Width}
    ...Count: the number of ...
    Score: a interval [1,score] for Score of each Crown and Deduction of each Barb */
    var TMap = new Array();
    for (var i = 0; i < Size.Height; i++) {
        TMap[i] = new Array();
        for (var j = 0; j < Size.Width; j++)
            TMap[i][j] = null;
    }
    while (PrizeCount > 0) {
        var TMapX = Math.floor(Math.random() * Size.Width);
        var TMapY = Math.floor(Math.random() * Size.Height);
        if (TMap[TMapX][TMapY] == null && TMapX + TMapY !== 0) {
            TMap[TMapX][TMapY] = { Bonus: Math.floor(Math.random() * Score + 1), Block: false, Barb: -1, Boom: false };
            PrizeCount--;
        }
    }
    while (BlockCount > 0) {
        var TMapX = Math.floor(Math.random() * Size.Width);
        var TMapY = Math.floor(Math.random() * Size.Height);
        if (TMap[TMapX][TMapY] == null && TMapX + TMapY !== 0) {
            TMap[TMapX][TMapY] = { Bonus: -1, Block: true, Barb: -1, Boom: false };
            BlockCount--;
        }
    }
    while (BarbCount > 0) {
        var TMapX = Math.floor(Math.random() * Size.Width);
        var TMapY = Math.floor(Math.random() * Size.Height);
        var Tmp = Math.floor(Math.random() * Score);
        if (TMap[TMapX][TMapY] == null && TMapX + TMapY !== 0) {
            TMap[TMapX][TMapY] = { Bonus: -1, Block: false, Barb: Tmp, Boom: false };
            BarbCount--;
        }
    }
    while (BoomCount > 0) {
        var TMapX = Math.floor(Math.random() * Size.Width);
        var TMapY = Math.floor(Math.random() * Size.Height);
        if (TMap[TMapX][TMapY] == null && TMapX + TMapY !== 0) {
            TMap[TMapX][TMapY] = { Bonus: -1, Block: false, Barb: -1, Boom: true };
            BoomCount--;
        }
    }
    return TMap;
};
var DrawTMap = function (TMap, Size) {
    /* Draw the TMap with Crowns
    TMap: null: Nothing; Bonus>=0: Prize; Barb>=0: Barb; Block===true; Boom===true;
    Size: {Height,Width}
    */
    for (var i = 0; i < Size.Height; i++) {
        var Row = document.createElement('div');
        Row.setAttribute('class', 'Row');
        SelectTMap.appendChild(Row);
        for (var j = 0; j < Size.Height; j++) {
            var Cell = document.createElement('div');
            Cell.setAttribute('class', 'Cell');
            if (TMap[i][j] === null) {
                Row.appendChild(Cell);
                continue;
            }
            if (TMap[i][j].Bonus >= 0) {
                var Img = document.createElement('img');
                Img.setAttribute('src', '../image/prize.svg');
                Img.setAttribute('class', 'Prize');
                Cell.appendChild(Img);
            }
            if (TMap[i][j].Block) {
                var Img = document.createElement('img');
                Img.setAttribute('src', '../image/block.svg');
                Img.setAttribute('class', 'Block');
                Cell.appendChild(Img);
            }
            if (TMap[i][j].Boom) {
                var Img = document.createElement('img');
                Img.setAttribute('src', '../image/boom.svg');
                Img.setAttribute('class', 'Boom');
                Cell.appendChild(Img);
            }
            if (TMap[i][j].Barb >= 0) {
                var Img = document.createElement('img');
                Img.setAttribute('src', '../image/barb.svg');
                Img.setAttribute('class', 'Barb');
                Cell.appendChild(Img);
            }
            Row.appendChild(Cell);
        }
    }
};
var DrawMan = function (Position) {
    /* Draw a robot on point Position:{X,Y} in the TMap
    X: x-axis (Height), Y: y-axis (Width)*/
    var X = Position.ManX, Y = Position.ManY;
    X++;
    Y++;
    var TmpImg = document.querySelector('.Row:nth-child(' + X + ') .Cell:nth-child(' + Y + ') img');
    if (TmpImg === null) {
        var TmpCell = document.querySelector('.Row:nth-child(' + X + ') .Cell:nth-child(' + Y + ')');
        var NewImg = document.createElement('img');
        NewImg.setAttribute('src', '../image/robot.svg');
        NewImg.setAttribute('class', 'Man');
        TmpCell.appendChild(NewImg);
    }
    else {
        TmpImg.setAttribute('src', '../image/robot.svg');
        TmpImg.setAttribute('class', 'Man');
    }
};
var DeleteMan = function (Position) {
    /* Delete a robot on point Position:{X,Y} in the TMap
    X: x-axis (Height), Y: y-axis (Width)*/
    var X = Position.ManX, Y = Position.ManY;
    X++;
    Y++;
    var TmpImg = document.querySelector('.Row:nth-child(' + X + ') .Cell:nth-child(' + Y + ') img');
    TmpImg.remove();
};
var CountScore = function (Position) {
    /* Count the Score and Check whether the Game is over or not
    Position:{Height,Width}*/
    var X = Position.ManX, Y = Position.ManY;
    if (TMap[X][Y] != null) {
        if (TMap[X][Y].Bonus >= 0) {
            Score += TMap[X][Y].Bonus;
            TMap[X][Y] = null;
            HitCrownCount--;
        }
        else if (TMap[X][Y].Barb >= 0) {
            Score -= TMap[X][Y].Barb;
            TMap[X][Y] = null;
        }
        else if (TMap[X][Y].Boom) {
            clearInterval(Timer);
            alert("You Lose!");
        }
    }
    SelectScore.textContent = 'Score: ' + Score;
    if (HitCrownCount === 0) {
        clearInterval(Timer);
        alert("You Win!");
    }
};
var ActiveStartButton = function () {
    /* Activate the Start Button, let the Game Start*/
    SelectStartButton.onclick = function () {
        if (IsActive === false)
            IsActive = true;
    };
};
document.onkeydown = function (Event) {
    /* Monitor the keyboard, let robot move reacting with Key {Right,Up,Left,Down}
    IsActive: false/true, check if the Game is Started*/
    if (!IsActive)
        return;
    var PrePos = __assign({}, Position);
    switch (Event.code) {
        case 'ArrowRight':
            Position.ManY++;
            break;
        case 'ArrowUp':
            Position.ManX--;
            break;
        case 'ArrowLeft':
            Position.ManY--;
            break;
        case 'ArrowDown':
            Position.ManX++;
            break;
        default: return;
    }
    if (IsBound(Position)) {
        DeleteMan(PrePos);
        DrawMan(Position);
    }
    else
        Position = __assign({}, PrePos);
    CountScore(Position);
};
var CountTime = function () {
    /* Count the Time 1s by 1s */
    if (!IsActive)
        return;
    Time++;
    SelectTime.textContent = 'Time: ' + Time + 's';
};
var TMap = InitTMap(INIT_SIZE, INIT_CROWN_COUNT, INIT_BLOCK_COUNT, INIT_BARB_COUNT, INIT_BOOM_COUNT, INIT_SCORE);
DrawTMap(TMap, INIT_SIZE);
DrawMan(Position);
ActiveStartButton();
var Timer = setInterval(CountTime, 1000);
console.log(TMap);
