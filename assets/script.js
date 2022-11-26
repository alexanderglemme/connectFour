var rows = 6
var columns = 7

var connect4Grid;

window.onload = function () {
    setGridCells();
}

var playerYellow = 'Yellow chip'
var playerRed = 'Red chip'
var currentPlayer = playerYellow
var numOfMatchingChips = 1;
var gameOver = false;

//function that makes divs representing the connect4-grid cells, and gives them unique coordinates by setting id
function setGridCells() {

    connect4Grid = [];

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        let row = []; //makes 6 empty arrays named row
        for (let colIndex = 0; colIndex < columns; colIndex++) {
            row.push(' '); //pupulates the row arrays with empty strings
            let cell = document.createElement('div');
            cell.addEventListener('click', placeChip) //Adds eventlistener to cells that call placeChip when clicked
            cell.classList.add('cell');
            cell.id = rowIndex.toString() + '-' + colIndex.toString();
            document.getElementById('connect4-grid').append(cell); //appends a div.cell to the html, and sets an id of 'rowIndex-colIndex'
        }
        connect4Grid.push(row) //pushes the row arrays to the grid array
    }
}

function placeChip() {
    let cell = this
    let clickedCellCoord = cell.id.split('-');
    let rowIndex = parseInt(clickedCellCoord[0]);
    let colIndex = parseInt(clickedCellCoord[1]);
    //Updates grids
    if (currentPlayer == playerRed) {
        cell.classList.add('red-chip'); //updates cell html and makes it red if the currentPlayer is playerRed
        connect4Grid[rowIndex][colIndex] = currentPlayer; //Updates the JS grid
        currentPlayer = playerYellow; //then turns currentPlayer to yellow as it exits if statement

    } else if (currentPlayer == playerYellow) {
        cell.classList.add('yellow-chip');
        connect4Grid[rowIndex][colIndex] = currentPlayer; //In each statement bc otherwise the strings would be flipped in JS grid
        currentPlayer = playerRed; //Back to red as it exits else if, so that next time its function is called currentPlayer == playerRed

    }
    connected4Row();
    connected4Col();
}

/*function checkWin() {
    //checks column per column for winner
    for (let colIndex = 0; colIndex < columns; colIndex++) {
        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            if (connect4Grid[rowIndex][colIndex] != undefined) {
                if (connect4Grid[rowIndex][colIndex] == connect4Grid[rowIndex][colIndex + 1] && connect4Grid[rowIndex][colIndex + 1] == connect4Grid[rowIndex][colIndex + 2]
                    && connect4Grid[rowIndex][colIndex + 2] == connect4Grid[rowIndex][colIndex + 3]) {
                        gameOver = true;
                        return true;
                }
            }
        }
    }
    //checks horisontal by iterating through all rows and looking for 4 defined cells that have the same value
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (let colIndex = 0; colIndex < 4; colIndex++) {
        if (connect4Grid[rowIndex][colIndex] != undefined) { 
            if (connect4Grid[rowIndex][colIndex] == connect4Grid[rowIndex + 1][colIndex] && connect4Grid[rowIndex + 1][colIndex] == connect4Grid[rowIndex + 2][colIndex]
                && connect4Grid[rowIndex + 2][colIndex] == connect4Grid[rowIndex + 3][colIndex]) {
                    gameOver = true;
                    return true;
                }
            }
        }
    }
     
}*/

function connected4Row() {
    let row = connect4Grid[0].length;
    let currentChipIndex = 0;
    let nextChipIndex = currentChipIndex + 1;


    for (nextChipIndex < row; nextChipIndex++;) {
        let currentValue = row[currentChipIndex]
        let nextValue = row[nextChipIndex]
        if (currentValue == nextValue) {
            if (row != undefined) {
                numOfMatchingChips += 1;
                if (numOfMatchingChips == 4) {
                    gameOver = true
                    return true;
                } else {
                    numOfMatchingChips = 1;
                }
            }
        }
        currentChipIndex += 1;
        nextChipIndex += 1;
    }
    return false;
}

function connected4Col() {
    //for (let colIndex = 0; colIndex < column.length; colIndex++) {
        let column = connect4Grid.length;
        let currentChipIndex = 0;
        let nextChipIndex = currentChipIndex + 1;

        for (nextChipIndex < column.length; nextChipIndex++;) {
            let currentValue = column[currentChipIndex][nextChipIndex];
            let nextValue = column[currentChipIndex][nextChipIndex];
            if (currentValue == nextValue) {
                if (column != undefined) {
                    numOfMatchingChips += 1;
                    if (numOfMatchingChips == 4) {
                        return true;
                    } else {
                        numOfMatchingChips = 1;
                    }
                }
            }
        }
        currentChipIndex += 1;
        nextChipIndex += 1;
    }
    return false;