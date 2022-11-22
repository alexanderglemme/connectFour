

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
        let row = [];//makes 6 empty arrays named row
        for (let c = 0; c < columns; c++) {
            row.push(' ');//pupulates the row arrays with empty strings
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = r.toString() + '-' + c.toString();
            document.getElementById('connect4-grid').append(cell);//appends a div.cell to the html, and gives an id of 'r-c'
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
]; Where the empty strings are cells represented as divs with r and c values as ids. First string in first array is connect4Grid[0][0]
which correlates to the first html child divs id with '-' in between so called r and c
*/

//Add function that changes the backgroundcolor of getElementByClassName('cell')