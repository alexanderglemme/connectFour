

//Make actual grid
var rows = 6
var columns = 7

var connect4Grid;

window.onload = function() {
    setGridCells();
}

//function that makes divs representing the connect4-grid cells, and gives them unique coordinates by setting id
function setGridCells() {
    
    connect4Grid = [];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let cell = document.createElement('div');
            cell.id = r.toString() + '-' + c.toString();
            cell.classList.add('cell');
            document.getElementById('connect4-grid').append(cell);
        }
        connect4Grid.push(row)
    }
}

//Add function that takes turns by changing the current player from red to yellow