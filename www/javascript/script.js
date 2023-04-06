//These values create a grid that fits the screen size of an Iphone 13 Pro Max
var rows = 30;
var cols = 11;

var playing = false;

var currGrid = new Array(rows);
var nextGrid = new Array(rows);

$(document).ready(function(){
    initArrays();
    createTable();
    setupBtnHandlers();
});

function initArrays(){
    for (var i=0; i<rows; i++){
        currGrid[i] = new Array(cols);
        nextGrid[i] = new Array(cols);
    }
}

function copyAndReset(){
    for (var i=0; i<rows; i++){
        for (var j=0; j<cols; j++){
            currGrid[i][j] = nextGrid[i][j];
            nextGrid[i][j] = 0;
        }
    }
}

function resetGrids(){
    for (var i=0; i<rows; i++){
        for (var j=0; j<cols; j++){
            currGrid[i][j] = 0;
            nextGrid[i][j] = 0;
        }
    }
}

function createTable(){
    for (var i=0; i<rows; i++){
        var tr = document.createElement("ons-row");
        for (var j=0; j<cols; j++){
            var cell = document.createElement("ons-col");
            cell.setAttribute("id",i+"_"+j);
            cell.setAttribute("class","dead");
            cell.onclick = cellClickHandler;
            tr.appendChild(cell);
        }
        $("#grid").append(tr);
    }
}

function cellClickHandler(){
    var rowcol = this.id.split("_");
    var row = rowcol[0];
    var col = rowcol[1];

    var classes = this.getAttribute("class");
    if (classes === "dead"){
        this.setAttribute("class","alive");
        currGrid[row][col] = 1;
    } else if(classes === "alive"){
        this.setAttribute("class","dead");
        currGrid[row][col] = 0;
    }
}

function setupBtnHandlers(){
    $("#playbtn").click(playBtnHandler);
    $("#clearbtn").click(clearBtnHandler);
    $("#randombtn").click(randomBtnHandler);
}

function playBtnHandler(){
    if (this.innerText === "Play")
        startGame();
    else pauseGame();
}   

function clearBtnHandler(){
    pauseGame();
    $(".alive").addClass("dead").removeClass("alive");
    resetGrids();
}

function randomBtnHandler(){
    clearBtnHandler();
    randomizeGrid();
}

function randomizeGrid(){
    for (var i=0; i<rows; i++){
        for (var j=0; j<cols; j++){
            if (Math.random() > 0.7){
                var id = "#" + i + "_" + j;
                $(id).addClass("alive").removeClass("dead");
                currGrid[i][j] = 1;
            }
        }
    }   
}

function startGame(){
    if ($("#playbtn").text() === "Play"){
        $("#playbtn").text("Pause");
        playing = true;
        if ($(".alive").length <= 0)
            randomizeGrid();
        setInterval(life, 200);
    }
}

function life(){
    if (playing){
        calculateNextGen();
        spawnCells();
        copyAndReset();
    }
}

function pauseGame(){
    if ($("#playbtn").text() === "Pause"){
        $("#playbtn").text("Play");
        playing = false;
    }
}

function calculateNextGen(){
    for (var i=0; i<rows; i++){
        for (var j=0; j<cols; j++){
            checkRules(i,j);
        }
    }
}

function checkRules(i ,j){
    var alive = currGrid[i][j] == 1? true: false;
    var numOfNeighbors = countNeighbors(i ,j); //# of alive neighbors
    if (alive){
        if (numOfNeighbors == 2 || numOfNeighbors == 3)
            nextGrid[i][j] = 1;
        else nextGrid[i][j] = 0;
    } else if (!alive){
        if (numOfNeighbors == 3)
            nextGrid[i][j] = 1;
        else nextGrid[i][j] = 0;
    }
}

function countNeighbors(i, j){
    var count = 0;
    if (i-1 >= 0)
        if (currGrid[i-1][j] == 1) count++;
    if (i+1 < rows)
        if (currGrid[i+1][j] == 1) count++;
    if (j-1 >= 0)
        if (currGrid[i][j-1] == 1) count++;
    if (j-1 < cols)
        if (currGrid[i][j+1] == 1) count++;
    if (i-1 >=0 && j-1 >=0)
        if (currGrid[i-1][j-1] == 1) count++;
    if (i-1 >=0 && j+1 < cols)
        if (currGrid[i-1][j+1] == 1) count++;
    if (i+1 < rows && j-1 >= 0)
        if (currGrid[i+1][j-1] == 1) count++;
    if (i+1 < rows && j+1 < cols)
        if (currGrid[i+1][j+1] == 1) count++;

    return count;
}

function spawnCells(){
    for (var i=0; i<rows; i++){
        for (var j=0; j<cols; j++){
            var id = "#" + i + "_" + j;
            if (nextGrid[i][j] == 0 && currGrid[i][j] == 1)
                $(id).addClass("dead").removeClass("alive");
            if (nextGrid[i][j] == 1 && currGrid[i][j] == 0)
                $(id).addClass("alive").removeClass("dead");
        }
    }
}
