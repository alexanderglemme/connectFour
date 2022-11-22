

//Make actual grid
var rows = 6
var columns = 7

var connect4Grid;

window.onload = function() {
    setGridCells();
}

var playerYellow = 'Yellow'
var playerRed = 'Red'
var currentPlayer = playerRed

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
            document.getElementById('connect4-grid').append(cell);//appends a div.cell to the html, and gives an id of 'rowIndex-colIndex'
        }
        connect4Grid.push(row)//pushes the rows to the grid
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
    let clickedCell = this.id.split('-');
    let rowIndex = clickedCell[0];
    let colIndex = clickedCell[1];

    let cell = document.getElementById(rowIndex + '-' + colIndex)//gets clicked cell
        if (currentPlayer == playerRed) {
        cell.classList.add('red-chip');//updates cell html and makes it red if the currentPlayer is playerRed
        let currentPlayer = playerYellow; 
    }

    if (currentPlayer == playerYellow) {
    cell.classList.add('yellow-chip');//updates cell html and makes it red if the currentPlayer is playerYellow
    let currentPlayer = playerRed; 
}
    //TODO: 1. Make colors alternate 2.figure out way to update JS grid to some player value that can be checked for winner
}