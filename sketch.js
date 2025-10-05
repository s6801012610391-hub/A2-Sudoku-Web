let clicked_rows = -1  //empty rows 
let clicked_cols = -1 //empty cols
let cell_size = 67 //size of cell
let table = []; // table for numbers
let lines = [];

function loadSudoku(lines) {
    table = [];
    let i = 0;
    while (i < lines.length) {
        let row = [];
        let j = 0;
        while (j < lines[i].length) {
            row.push(parseInt(lines[i][j]));
            j++;
        }
        table.push(row);
        i++;
    }
}

function draw_num() {
    let i = 0;
    while (i < 9) {
        let j = 0;
        while (j < 9) {
            if (table[i][j] != 0) {
                text(table[i][j], cell_size * j + cell_size / 2, cell_size * i + cell_size / 2);
            }
            j += 1;
        }
        i += 1;
    }
}


function draw_table() {
    let i = 0;
    while (i<8) {
        strokeWeight(1);
        if (i==2 || i==5) {
            strokeWeight(2);
        }
        line(cell_size+cell_size*i,0,cell_size+cell_size*i,height);
        i += 1;
    }

    let j = 0;
    while (j<8) {
        strokeWeight(1);
        if (j==2 || j ==5) {
            strokeWeight(2);
        }
        line(0,cell_size+cell_size*j,width,cell_size+cell_size*j);
        j += 1;
    }
}

function mousePressed() {
    let rows = Math.floor(mouseY/ cell_size);
    let cols = Math.floor(mouseX/ cell_size);
    if (rows >= 0 && rows < 9 && cols >= 0 && cols < 9) {
        clicked_rows = rows;
        clicked_cols = cols;
    }
}

function keyPressed() {
    if (clicked_rows != -1 && clicked_cols != -1) {
        if (table[clicked_rows][clicked_cols] == 0) {
            if (key >= '1' && key <= '9') {
                table[clicked_rows][clicked_cols] = int(key);
            }
        }
    }
}

function setup() {
    createCanvas(600, 600);
    textAlign(CENTER, CENTER);
    textSize(20);
    loadStrings('sudoku.txt', loadSudoku);
}

function draw() {
    background(200);
    draw_table();
    draw_num();

    if (clicked_rows != -1 && clicked_cols != -1) {
        fill(0, 200, 0, 100);
        rect(clicked_cols * cell_size, clicked_rows * cell_size, cell_size, cell_size);
    }
}