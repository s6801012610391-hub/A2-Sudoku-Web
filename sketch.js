let s = 600
let width = s
let height = s
let clicked_rows = -1  // empty rows 
let clicked_cols = -1 // empty cols
let cell_size = (s / 9) // size of cell
let table = []; // table for numbers
let formatError = false; // is format error?
let indexError = false; // is index error?
let truth_value = [ // 0 = wrong number, 1 = input number, 2 = fixed number
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1]
];

function loadSudoku(filename) {
    if (filename.endsWith('.txt')) {
        formatError = false;
        indexError = false;
        loadStrings(filename, function(data) {
            table = [];
            let r = 0;
            while (r < data.length) {
                let row = [];
                let c = 0;
                while (c < data[r].length) {
                    let n = data[r][c];
                    if (!"0123456789".includes(n)) { // if not number
                        indexError = true;
                        break;
                    }
                    row.push(parseInt(data[r][c]));
                    c += 1;
                }
                table.push(row);
                r += 1;
            }

            let i = 0;
            while (i < 9) {
                let j = 0;
                while (j <9) {
                    if (table[i][j] != 0) {
                        truth_value[i][j] = 2;
                    }
                    else {
                        truth_value[i][j] = 1;
                    }
                    j += 1;
                }
                i += 1;
            }
        });
    }
    else {
        formatError = true;
    }
}

function draw_num() {
    fill(0);
    let i = 0;
    while (i < 9) {
        let j = 0;
        while (j < 9) {
            if (table[i][j] != 0) {
                if (truth_value[i][j] == 2) {
                    fill(0); // fixed number = black
                }
                else if (truth_value[i][j] == 1) {
                    fill(0, 0, 200); // input number = blue
                }
                else if (truth_value[i][j] == 0) {
                    fill(200, 0, 0); // wrong number = red
                }
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
    if (clicked_rows != -1 && clicked_cols != -1) { // check if cell_size is unclicked
        if (truth_value[clicked_rows][clicked_cols] != 2) { // if number is not fixed number
            if (key >= '1' && key <= '9') { // if keyboard between 1 to 9
                table[clicked_rows][clicked_cols] = int(key); // number in table = int(key)
                checkNum()
            }
            else if (key == BACKSPACE) { // if key is BACKSPACE
                table[clicked_rows][clicked_cols] = 0; // delete number
                truth_value[clicked_rows][clicked_cols] = 1; // number is input number
            }
        }
    }
}

function checkNum(){
    let i = 0;
    while (i < 9) {
        if (table[clicked_rows][clicked_cols] == table[i][clicked_cols] && i != clicked_rows) {
            truth_value[clicked_rows][clicked_cols] = 0;
        }
        i += 1;
    }

    let j = 0;
    while (j < 9) {
        if (table[clicked_rows][clicked_cols] == table[clicked_rows][j] && j != clicked_cols) {
            truth_value[clicked_rows][clicked_cols] = 0;
        }
        j += 1;
    }

    // subgrids
    let s_rows = Math.floor(clicked_rows / 3) * 3;
    let s_cols = Math.floor(clicked_cols / 3) * 3;

    let ibox = 0;
    while (ibox < 3) {
        let jbox = 0;
        while (jbox < 3) {
            let r = s_rows + ibox;
            let c = s_cols + jbox;
            if ((r != clicked_rows || c != clicked_cols) && table[r][c] == table[clicked_rows][clicked_cols]) {
                truth_value[clicked_rows][clicked_cols] = 0;
            }
            jbox += 1;
        }
        ibox += 1;
    }
}

function endgame() {
    background(200);
    fill(0);
    textAlign(CENTER);
    textSize(32);
    text("End!",width/2,height/2);
}

function setup() {
    createCanvas(width, height);
    textAlign(CENTER, CENTER);
    textSize(20);
    loadSudoku('sudoku.txt');
}

function draw() {
    background(200);

    if (formatError == true) {
        fill(200, 0, 0);
        textSize(32);
        text("Format Error", width/2, height/2);
        return;
    }

    if (indexError) {
        fill(255, 0, 0);
        textSize(32);
        text("Index Error", width/2, height/2);
        return;
    }

    draw_table();
    draw_num();

    if (clicked_rows != -1 && clicked_cols != -1) {
        fill(0, 200, 0, 100);
        rect(clicked_cols * cell_size, clicked_rows * cell_size, cell_size, cell_size);
    }

    let count = 0; // count for input number
    let fixed_count = 0; // count for fixed number
    let i = 0;
    while (i < 9) {
        let j = 0;
        while (j < 9) {
            if (table[i][j] != 0 && truth_value[i][j] == 1) { // if number is not 0 and it is input number
                count += 1; 
            }
            if (truth_value[i][j] == 2) { // if number is fixed
                fixed_count += 1;
            }
            j += 1;
        }
        i += 1;
    }

    let total = count + fixed_count;
    if (total == 81) {
        endgame();
        noLoop();
    }
}