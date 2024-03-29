const table = document.getElementsByTagName("table")[0];

const array = [];

//draw empty grid

for (let i = 0; i < 9; i++) {
    let tr = document.createElement("tr");
    let subArray = [];
    for (let j = 0; j < 9; j++) {
        let td = document.createElement("td");
        let input = document.createElement("input");
        input.className = "cell";
        input.maxLength = "1";
        input.addEventListener("input", () => {
            if (!/^\d+$/.test(input.value)) {
                input.value = "";
            }
        });

        td.appendChild(input);
        tr.appendChild(td);

        subArray[j] = input;
    }
    table.appendChild(tr);
    array[i] = subArray;
}

function solveSudoku(matrix) {

    let row = 0;
    let col = 0;
    let grid = matrix;

    solveSudoku(grid, row, col);

    // recursive algo
    function solveSudoku(grid, row, col) {
        let cell = findUnassignedLocation(grid, row, col);
        row = cell[0];
        col = cell[1];

        // base case: if no empty cell
        if (row == -1) {
            return true;
        }

        for (let num = 1; num <= 9; num++) {
            if (noConflicts(grid, row, col, num)) {
                grid[row][col].value = num;

                if (solveSudoku(grid, row, col)) {
                    return true;
                }

                // mark cell as empty (with 0)
                grid[row][col].value = "";
            }
        }

        // trigger back tracking
        return false;
    }


    function findUnassignedLocation(grid, row, col) {
        let done = false;
        let res = [-1, -1];

        while (!done) {
            if (row == 9) {
                done = true;
            } else {
                if (grid[row][col].value == "") {
                    res[0] = row;
                    res[1] = col;
                    done = true;
                } else {
                    if (col < 8) {
                        col++;
                    } else {
                        row++;
                        col = 0;
                    }
                }
            }
        }

        return res;
    }

    function noConflicts(grid, row, col, num) {
        return isRowOk(grid, row, num) && isColOk(grid, col, num) && isBoxOk(grid, row, col, num);
    }

    function isRowOk(grid, row, num) {
        for (let col = 0; col < 9; col++)
            if (grid[row][col].value == num)
                return false;

        return true;
    }

    function isColOk(grid, col, num) {
        for (let row = 0; row < 9; row++)
            if (grid[row][col].value == num)
                return false;

        return true;
    }

    function isBoxOk(grid, row, col, num) {
        row = Math.floor(row / 3) * 3;
        col = Math.floor(col / 3) * 3;

        for (let r = 0; r < 3; r++)
            for (let c = 0; c < 3; c++)
                if (grid[row + r][col + c].value == num)
                    return false;

        return true;
    }
};

function clean() {
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].value = "";
    }
}


