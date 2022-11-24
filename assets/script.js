

//Make actual grid
var rows = 6
var columns = 7

var connect4Grid;

window.onload = function() {
    setGridCells();
}

var playerYellow = 'Yellow chip'
var playerRed = 'Red chip'
var currentPlayer = playerYellow

//function that makes divs representing the connect4-grid cells, and gives them unique coordinates by setting id
function setGridCells() {
    
    connect4Grid = [];

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        let row = [];//makes 6 empty arrays named row
        for (let colIndex = 0; colIndex < columns; colIndex++) {
            row.push(' ');//pupulates the row arrays with empty strings
            let cell = document.createElement('div');
            cell.addEventListener('click', placeChip)//Adds eventlistener to cells that call placeChip when clicked
            cell.classList.add('cell');
            cell.id = rowIndex.toString() + '-' + colIndex.toString();
            document.getElementById('connect4-grid').append(cell);//appends a div.cell to the html, and sets an id of 'rowIndex-colIndex'
        }
        connect4Grid.push(row)//pushes the row arrays to the grid array
    }
}/*
This now makes a JS grid that looks like this:
connect4Grid = [
    ['','','','','','',''],
    ['','','','','','',''],
    ['','','','','','',''],
    ['','','','','','',''],
    ['','','','','','',''],
    ['','','','','','',''],
]; Where the empty strings are cells represented as divs with rowIndex and colIndex values as ids. First string in first array is connect4Grid[0][0]
which correlates to the first html child divs id with '-' in between so called rowIndex and colIndex
*/

//Add function that changes the backgroundcolor of getElementByClassName('cell')

function placeChip() {
    let cell = this
    let clickedCellCoord = cell.id.split('-');
    let rowIndex = parseInt(clickedCellCoord[0]);
    let colIndex = parseInt(clickedCellCoord[1]); 
//Updates html grid
        if (currentPlayer == playerRed) {
        cell.classList.add('red-chip');//updates cell html and makes it red if the currentPlayer is playerRed
        connect4Grid[rowIndex][colIndex] = currentPlayer;//Updates the JS grid
        currentPlayer = playerYellow;//then turns currentPlayer to yellow as it exits if statement
        //checkWin(rowIndex, colIndex);
    } else if (currentPlayer == playerYellow) {
        cell.classList.add('yellow-chip');
        connect4Grid[rowIndex][colIndex] = currentPlayer;//In each statement bc otherwise the strings would be flipped in JS grid
        currentPlayer = playerRed;//back to red as it exits else if, so that next time its function is called currentPlayer == playerRed
        //checkWin(rowIndex, colIndex);
    }
   checkWin(rowIndex, colIndex);
}

function checkWin(rowIndex, colIndex) {
    if (connected4Row(rowIndex) || connected4Col(colIndex)) {
        return true;
    } else {
        return false;
    }

}

function connected4Row(rowIndex) {
    let row = connect4Grid[rowIndex];
    let currentChipIndex = 0;
    let nextChipIndex = currentChipIndex + 1;
    let numOfMatchingChips = 1;

    while (nextChipIndex < row.length) {
        let currentValue = row[currentChipIndex]
        let nextValue = row[nextChipIndex]
        if (currentValue == nextValue) {
            numOfMatchingChips += 1;
            if(numOfMatchingChips == 4) {
                return true
            } else {
                numOfMatchingChips = 1;
            }
        }
    }
    return false;
}







/*checkWin = function() {
    connected4();
}

function connected4() {
    for (let rowIndex = 0; rowIndex <= rows; rowIndex++) {
        for (let colIndex = 0; colIndex <= columns; colIndex++)
    if (connect4Grid[rowIndex][colIndex] == connect4Grid[rowIndex + 1][colIndex] && connect4Grid[rowIndex + 1][colIndex] == connect4Grid[rowIndex + 2][colIndex]
        && connect4Grid[rowIndex + 3][colIndex]) {
            window.alert('We have a winner!!!');
        }
    }    
}*/