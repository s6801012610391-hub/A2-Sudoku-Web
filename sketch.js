let clicked_rows = -1  //empty rows 
let clicked_cols = -1 //empty cols
let cell_size = 67 //size of cell

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

function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(200);
    draw_table();

    let i = 0;
    while (i < 9) {
        let j = 0;
        while (j < 9) {
            let x = j * cell_size;
            let y = i * cell_size;
            if (i == clicked_rows && j == clicked_cols) {
                fill(0, 200, 0);
                rect(x, y, cell_size, cell_size);
            }
            else {
                fill(0);
            }
            j += 1;
        }
        i += 1;
    }
}