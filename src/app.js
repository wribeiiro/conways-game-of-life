var htmlElements = [];
var cells = [];
const SIZE = 50;
const DEAD = 0;
const ALIVE = 1;

function drawField() {
    const table = document.getElementById("table");

    for (let y = 0; y < SIZE; y++) {
        let tr = document.createElement("tr");
        let tdElements = [];

        cells.push(new Array(SIZE).fill(DEAD));
        htmlElements.push(tdElements);
        table.appendChild(tr);

        for (let x = 0; x < SIZE; x++) {
            let td = document.createElement('td');
            tdElements.push(td)
            tr.appendChild(td);
        }
    }
}

function drawGame() {
    for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
            let attributeClass = cells[y][x] == 1 ? 'alive' : 'dead';
            htmlElements[y][x].setAttribute('class', `cell ${attributeClass}`);
        }
    }
}

function countNeighbours(x, y) {
    let count = 0;

    for (dy = -1; dy <= 1; dy++) {
        for (dx = -1; dx <= 1; dx++) {
            let nx = (x + dx + SIZE) % SIZE;
            let ny = (y + dy + SIZE) % SIZE;

            count = count + cells[ny][nx];
        }
    }

    return count - cells[y][x];
}

function drawNewGeneration() {
    let newCells = [];

    for (let i = 0; i < SIZE; i++) {
        newCells.push(new Array(SIZE).fill(DEAD));
    }

    for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
            let neighbours = countNeighbours(x, y);

            if (cells[y][x] == DEAD && neighbours == 3) {
                newCells[y][x] = ALIVE;
            }

            if (cells[y][x] == ALIVE && (neighbours == 2 || neighbours == 3)) {
                newCells[y][x] = ALIVE;
            }
        }
    }

    cells = newCells;

    drawGame();
}

function fillRandomFields() {
    for (let i = 0; i < Math.floor(SIZE * SIZE * 0.4); i++) {
        var x, y;

        while (true) {
            x = Math.floor(Math.random() * SIZE);
            y = Math.floor(Math.random() * SIZE);

            if (cells[y][x] == DEAD) {
                cells[y][x] = ALIVE;
                break;
            }
        }
    }
}

function runGame() {
    drawField();
    fillRandomFields();
    drawGame();
    setInterval(drawNewGeneration, 120);
}

runGame();
