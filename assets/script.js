

//Make actual grid
var rows = 6
var columns = 7

var connect4Grid;

window.onload = function() {
    setGridCells();
}

//function that makes divs representing the connect4-grid cells, and gives them unique coordinates by setting id
function setGridCells() {
    
    gameGrid = [];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

        }
    }
}

//Add function that takes turns by changing the current player from red to yellow