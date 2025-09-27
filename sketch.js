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
        line(67+67*i,0,67+67*i,height);
        i += 1;
    }

    let j = 0;
    while (j<8) {
        strokeWeight(1);
        if (j==2 || j ==5) {
            strokeWeight(2);
        }
        line(0,67+67*j,width,67+67*j);
        j += 1;
    }
}

function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(200);
    draw_table();
}