// 1. Creates ship objects with properties for length, hitCount, hit, and isSunk.
function ship(length){
    return {
        length: length,
        hitCount: 0,
        hit() { return this.hitCount++ },
        isSunk() { return this.length - this.hitCount > 0 ? false : true }
    }
}

// 2. Creates and populates board with ships, and tracks/displays missed attacks
const gameBoard = {
    ships: [ship(5), ship(4), ship(4), ship(3), ship(3), ship(3), ship(2), ship(2), ship(2), ship(2)],
    tiles: [],
    createTiles() {
        for (let i = 0; i < 10; i++) {
            let temp = [];
            for (let j = 0; j < 10; j++) {
                temp.push({isFilled: false, ship: null});
        }
        this.tiles.push(temp);
        }
        return;
    },
    isFilled(row, col){
        return tile[row][col].isFilled ? true : false;
    },
    randomDirection(){
        return (Math.random() * (11 - 0) + 0) <= 5 ? 'h' : 'v';
    },
    randomCoordinates(length) {
        let a = Math.round(Math.random() * (11 - 0) + 0);
        let b =  Math.round(Math.random() * (11 - 0) + 0);
        let arr = []
        if (this.isFilled(a, b)){
            return this.randomCoordinates();
        }
        let dir = this.randomDirection();
        for (i = 0; i < length; i++){
            dir === 'h' ? arr.push(a, b + i) : arr.push(a + i, b);
        }
        for (i = 0; i < length * 2; i + 2){
            if (this.isFilled(arr[i], arr[i + 1])){ return this.randomCoordinates()}
        }
        return arr;
    },
    populate() {
        this.ships.forEach( ship => {
            let temp = this.randomCoordinates(ship.length);
            for (i = 0; i < temp.length; i + 2){
                this.tiles[temp[i], temp[i + 1]].isFilled = true;
                this.tiles[temp[i], temp[i + 1]].ship = ship;
            }
            
        })
    }
}

export {ship, gameBoard};