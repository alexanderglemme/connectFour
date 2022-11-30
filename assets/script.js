var rows = 6
var columns = 7

var connect4Grid;

var numOfMatchingChips;

window.onload = function () {
    setGridCells();
}

var playerYellow = 'Yellow';
var playerRed = 'Red';
var currentPlayer = playerYellow;
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
    alert('Hi, and welcome to connect four!')
    alert('The rules are simple: Try and connect 4 chips of the same color by placing them on the grid either vertically, horisontally or diagonally.')
    alert("Note that you are only allowed to place chips on empty cells starting from the BOTTOM! Let's begin!")
    alert('Yellow goes first!')
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
        checkWin();
        currentPlayer = playerYellow; //then turns currentPlayer to yellow as it exits if statement

    } else if (currentPlayer == playerYellow) {
        cell.classList.add('yellow-chip');
        connect4Grid[rowIndex][colIndex] = currentPlayer; //In each statement bc otherwise the strings would be flipped in JS grid
        checkWin();
        currentPlayer = playerRed; //Back to red as it exits else if, so that next time its function is called currentPlayer == playerRed

    }
    //checkWin();
}

function checkWin() {
    //checks vertically
    for (let colIndex = 0; colIndex < columns; colIndex++) {
        for (let rowIndex = 0; rowIndex < rows - 3; rowIndex++) {
            if (connect4Grid[rowIndex][colIndex] != ' ') {
                if (connect4Grid[rowIndex][colIndex] == connect4Grid[rowIndex + 1][colIndex] && connect4Grid[rowIndex + 1][colIndex] == connect4Grid[rowIndex + 2][colIndex] && connect4Grid[rowIndex + 2][colIndex] == connect4Grid[rowIndex + 3][colIndex]) {
                    alert('Hooray ' + currentPlayer + ' just won vertically!')
            }
        }

    }
}
    //Checks horisontal
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (let colIndex = 0; colIndex < columns - 3; colIndex++) {
            if (connect4Grid[rowIndex][colIndex] != ' ') {
                if (connect4Grid[rowIndex][colIndex] == connect4Grid[rowIndex][colIndex + 1] && connect4Grid[rowIndex][colIndex + 1] == connect4Grid[rowIndex][colIndex + 2] && connect4Grid[rowIndex][colIndex + 2] == connect4Grid[rowIndex][colIndex + 3]) {
                    alert('Hooray ' + currentPlayer + ' just won horisontally!');
                }
            }
        }
    }
    //checks diagonally bottom to top
    for (let rowIndex = 5; rowIndex > 3; rowIndex--) {
        for (let colIndex = 0; colIndex < columns - 3; colIndex++) {
            if (connect4Grid[rowIndex][colIndex] != ' ') {
                if (connect4Grid[rowIndex][colIndex] == connect4Grid[rowIndex - 1][colIndex + 1] && connect4Grid[rowIndex - 1][colIndex + 1] == connect4Grid[rowIndex - 2][colIndex + 2] && connect4Grid[rowIndex - 2][colIndex + 2] == connect4Grid[rowIndex - 3][colIndex +3]) {
                    alert('Hooray ' + currentPlayer + ' just won diagonally!');
                }
            }
        }
    }
    //checks diagonally top to bottom
    for (let colIndex = 0; colIndex < columns - 3; colIndex++) {
        for (let rowIndex = 0; rowIndex < rows - 3; rowIndex++) {
            if (connect4Grid[rowIndex][colIndex] != ' ') {
                if (connect4Grid[rowIndex][colIndex] == connect4Grid[rowIndex + 1][colIndex + 1] && connect4Grid[rowIndex + 1][colIndex + 1] == connect4Grid[rowIndex + 2][colIndex + 2] && connect4Grid[rowIndex + 2][colIndex + 2] == connect4Grid[rowIndex + 3][colIndex + 3]) {
                    alert('Hooray ' + currentPlayer + ' just won diagonally!');
                }
            }
        }
    }
}
