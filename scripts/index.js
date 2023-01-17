// 1. Creates ship objects with properties for length, hitCount, hit, and isSunk.
function ship(length){
    return {
        length: length,
        hitCount: 0,
        location: [],
        hit() { return this.hitCount++ },
        isSunk() { return this.length - this.hitCount > 0 ? false : true }
    }
}

function createTiles() {
    let tiles = [];
    for (let i = 0; i < 10; i++) {
        let temp = [];
        for (let j = 0; j < 10; j++) {
            temp.push({ isFilled: false, display: null, ship: null });
        }
        tiles.push(temp);
    }
    return tiles;
}

function createShips() {
    let lengths = [5, 4, 4, 3, 3, 3, 2, 2, 2, 2];
    let ships = [];
    lengths.forEach(length => ships.push(ship(length)))
    return ships;
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
    // Check if path for collisions
    let coords = checkCoordinates(a, b, dir, arr, length);
    if (!coords) { return getRandomPosition(arr, length) } // If there is a ship in the path
    if (coords) { return coords } // If path is clear
}

// Function that gets coordinates from ui
function getCoordinates(user, tiles, ship) { //Relies on user input
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
// receiveAttack() 
// Attacks on empty tiles should return false
// Misses should be added to misses property
// Attacks on occupied tiles should return true
// Hits should be recorded in ship hit count


class GameBoard {
    constructor(user) {
        this.ships = createShips();
        this.tiles = createTiles();
        this.misses = [];
        this.user = user;
        this.populate = ship => {
            let coordinates = getCoordinates(user, this.tiles, ship);
            console.log('get coordinates: ', coordinates);
            coordinates.pos.forEach(pos => {
                ship.location.push([pos[0],pos[1]]);
                this.tiles[pos[0]][pos[1]].isFilled = true;
                this.tiles[pos[0]][pos[1]].ship = ship;
            })
        };
        this.receiveAttack = (a, b)  => {
            let tile = this.tiles[a][b];
            console.log('tile: ', tile);
            if (tile.isFilled){
                console.log('tile.ship: ', tile.ship);
                tile.ship.hit();
                // check if is sunk
                return true;
            }
            this.misses.push([a, b]);
            return false;
        };
        this.allSunk = () => {
            this.ships.forEach(ship => {
                if (!ship.isSunk()) { return false }
            })
            return true;
        };
    };
}



export {ship, GameBoard};