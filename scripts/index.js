// 1. Creates ship objects with properties for length, hitCount, hit, and isSunk.
function ship(length){
    return {
        length: length,
        hitCount: 0,
        coordStart: null;
        hit() { return this.hitCount++ },
        isSunk() { return this.length - this.hitCount > 0 ? false : true }
    }
}

function createTiles() {
    let tiles = [];
    for (let i = 0; i < 10; i++) {
        let temp = [];
        for (let j = 0; j < 10; j++) {
            temp.push({ isFilled: false, ship: null });
        }
        tiles.push(temp);
    }
    return tiles;
}

// Helpers for #2
const DIR = 'h'//placeholders for ui

// Function that checks if all coordinates in a range are free
function checkCoordinates(a, b, dir, tiles, length) {
    let min = dir === 'h' ? b : a
    let max = min + length - 1;
    if (max > 9) { return false } // Keep coordinates within grid
    let temp = [];
    while (min <= max) {
        if (tiles[a][b].isFilled === true) { return false }
        temp.push([a, b])
        dir === 'h' ? b++ : a++;
        min++;
    }
    return { pos: temp, dir: dir };
}
// Function that randomizes ship positions for computer
function getRandomPosition(arr, length) {
    let a = Math.floor(Math.random() * 9);
    let b = Math.floor(Math.random() * 9);
    let dir = (Math.random() * (10 - 1) + 1) <= 5 ? 'h' : 'v';
    // Check if path is clear
    let coords = checkCoordinates(a, b, dir, arr, length);
    // If there is a ship in the path, recurse
    if (coords === false) { getRandomPosition(arr, length) }
    return coords;
}

// Function that gets coordinates from ui
function getCoordinates(user, tiles, ship, dir) { //Relies on user input
    if (user === 'computer'){ 
        // If user is computer, randomize ship placement
        return getRandomPosition(tiles, ship.length); 
    }
    return 'To do';
    // else get position, direction, from user
    // let a = 
    // let b = 
    // return  checkCoordinates(a, b, dir, tiles, length);
}


// 2. Creates and populates board with ships, and tracks/displays missed attacks
class gameBoard {
    constructor(user) {
        this.ships = [ship(5), ship(4), ship(4), ship(3), ship(3), ship(3), ship(2), ship(2), ship(2), ship(2)];
        this.tiles = createTiles();
        this.user = user;
        this.populate = function (ship) {
            let coordinates = getCoordinates(user, tiles, ship);
            let positions = coordinates.pos;
            positions.forEach(pos => {
                this.tile[pos[0]][pos[1]].isFilled = true;
            })
        };
    };
}



export {ship, gameBoard};