const rows = 6;
const columns = 7;

var availableCellInRow = [5, 5, 5, 5, 5, 5, 5]

var connect4Grid;
window.onload = function () {
    setGridCells();
}

var gameOver = false;

const playerYellow = 'Yellow';
const playerRed = 'Red';
var currentPlayer = playerYellow;

/**
 * The setGridCells() function makes divs
 * representing the connect4-grid cells,
 * gives them unique coordinates by setting id via iteration,
 * gives each cell an event listener that calls placeChip when clicked
 * and makes a 2D array populated with empty strings,
 * so that the JS grid correlates with the HTML grid.
 */
function setGridCells() {
    connect4Grid = [];

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        let row = [];
        for (let colIndex = 0; colIndex < columns; colIndex++) {
            row.push(' ');
            let cell = document.createElement('div');
            cell.addEventListener('click', placeChip)
            cell.classList.add('cell');
            cell.id = rowIndex.toString() + '-' + colIndex.toString();
            document.getElementById('connect4-grid').append(cell);
        }
        connect4Grid.push(row);
    }
}
/**
 * The placeChip() function gets the clicked cells id,
 * turns it into integers so that it can be used 
 * to specify which cell has been clicked in the DOM
 * so it can turn that index into either 'Yellow' or 'Red'
 * anytime a cell gets clicked. It also adds the current players
 * chip to the HTML grid by adding a class to the clicked cell,
 * while directly after switching the current player after
 * each turn.
 */
function placeChip() {
    let clickedCellCoord = this.id.split('-');
    let colIndex = parseInt(clickedCellCoord[1]);
    let rowIndex = availableCellInRow[colIndex];

    let cell = document.getElementById(rowIndex.toString() + '-' + colIndex.toString());

    //If someone has won, gameOver is true, causing early return
    if (gameOver) {
        return;
    }

    if (availableCellInRow[colIndex] + 1 == 0) {
        return;
    }
    //Updates grids
    if (currentPlayer == playerRed) {
        //HTML
        cell.classList.add('red-chip');
        //JavaScript
        connect4Grid[rowIndex][colIndex] = currentPlayer;
        checkWin();
        currentPlayer = playerYellow;
    } else if (currentPlayer == playerYellow) {
        cell.classList.add('yellow-chip');
        connect4Grid[rowIndex][colIndex] = currentPlayer;
        checkWin();
        currentPlayer = playerRed;

    }
    availableCellInRow[colIndex] -= 1;
}


/**
 * The checkWin() function checks the entire connect4Grid
 * both vertically, horisontally and diagonally, using a
 * variation of the sliding window technique.
 * If it finds 4 indices that are the same (and not ' ') in any direction,
 * it gives an alert to let the user know who won and how,
 * and sets gameOver to true causing an early return
 * in the placeChip() function, before it returns.
 */

/*
 I used nested for loops and wrote out the index's names
 for readability reasons. The loop's increment values
 always correspond with the if statement's decrement values
 and vice versa so that the function never checks outside the grid.
*/
function checkWin() {
    //Vertical check (checks every rowIndex in each column)
    for (let colIndex = 0; colIndex < columns; colIndex++) {
        for (let rowIndex = 0; rowIndex < rows - 3; rowIndex++) {
            if (connect4Grid[rowIndex][colIndex] != ' ') {
                if (connect4Grid[rowIndex][colIndex] == connect4Grid[rowIndex + 1][colIndex] &&
                    connect4Grid[rowIndex + 1][colIndex] == connect4Grid[rowIndex + 2][colIndex] &&
                    connect4Grid[rowIndex + 2][colIndex] == connect4Grid[rowIndex + 3][colIndex]
                ) {
                    gameOver = true;
                    Swal.fire('Hooray!', currentPlayer + ' just won vertically! Reset the grid to play again!', 'success')
                    return;
                }
            }
        }
    }
    //Horizontal check (checks every colIndex in each row)
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (let colIndex = 0; colIndex < columns - 3; colIndex++) {
            if (connect4Grid[rowIndex][colIndex] != ' ') {
                if (connect4Grid[rowIndex][colIndex] == connect4Grid[rowIndex][colIndex + 1] &&
                    connect4Grid[rowIndex][colIndex + 1] == connect4Grid[rowIndex][colIndex + 2] &&
                    connect4Grid[rowIndex][colIndex + 2] == connect4Grid[rowIndex][colIndex + 3]
                ) {
                    gameOver = true;
                    Swal.fire('Hooray!', currentPlayer + ' just won horizontally! Reset the grid to play again!', 'success');
                    return;
                }
            }
        }
    }
    //Diagonal check (from bottom left of grid '5-0' to top right of grid '0-6')
    for (let rowIndex = 5; rowIndex >= 3; rowIndex--) {
        for (let colIndex = 0; colIndex < columns - 3; colIndex++) {
            if (connect4Grid[rowIndex][colIndex] != ' ') {
                if (connect4Grid[rowIndex][colIndex] == connect4Grid[rowIndex - 1][colIndex + 1] &&
                    connect4Grid[rowIndex - 1][colIndex + 1] == connect4Grid[rowIndex - 2][colIndex + 2] &&
                    connect4Grid[rowIndex - 2][colIndex + 2] == connect4Grid[rowIndex - 3][colIndex + 3]
                ) {
                    gameOver = true;
                    Swal.fire('Hooray!', currentPlayer + ' just won diagonally! Reset the grid to play again!', 'success');
                    return;
                }
            }
        }
    }
    //Diagonal check (from top left of grid '0-0' to bottom right of grid '5-5')
    //The -3 in diagonal checks also hinders the loops from checking corners
    for (let colIndex = 0; colIndex < columns - 3; colIndex++) {
        for (let rowIndex = 0; rowIndex < rows - 3; rowIndex++) {
            if (connect4Grid[rowIndex][colIndex] != ' ') {
                if (connect4Grid[rowIndex][colIndex] == connect4Grid[rowIndex + 1][colIndex + 1] &&
                    connect4Grid[rowIndex + 1][colIndex + 1] == connect4Grid[rowIndex + 2][colIndex + 2] &&
                    connect4Grid[rowIndex + 2][colIndex + 2] == connect4Grid[rowIndex + 3][colIndex + 3]
                ) {
                    gameOver = true;
                    Swal.fire('Hooray!', currentPlayer + ' just won diagonally! Reset the grid to play again!', 'success');
                    return;
                }
            }
        }
    }
}

function resetGame() {
    availableCellInRow = [5, 5, 5, 5, 5, 5, 5];
    gameOver = false;
    currentPlayer = playerYellow;

    let connect4HtmlGrid = document.getElementById('connect4-grid');

        while (connect4HtmlGrid.firstChild) {
            connect4HtmlGrid.removeChild(connect4HtmlGrid.firstChild);
        }
    
      setGridCells();

}

function showRules() {
    Swal.fire('Welcome to Connect Four!', 
    'The rules are simple! Just try and connect 4 chips of the same color either vertically, horizontally or diagonally by clicking a column on the grid. Yellow goes first!',
    'info')
}