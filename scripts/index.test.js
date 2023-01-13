const ship = require('./index');

test('initially returns an empty ship object of a certain length', () => {
    expect(ship(2).length).toBe(2);
    expect(ship(2).hitCount).toBe(0);
});

test('handles attacks', () => {
    const aShip = ship(1);
    const bShip = ship(2);
    aShip.hit();
    bShip.hit();
    // hit() function increments hitCount
    expect(aShip.hitCount).toBe(1);
    expect(bShip.hitCount).toBe(1);
    // isSunk() returns T/F based on length and hitCount
    expect(aShip.isSunk()).toBe(true);
    expect(bShip.isSunk()).toBe(false);
});

const gameBoard = require('./index');
test('creates blank 8x8 game board', () => {
    const board = gameBoard.createTiles();
    expect(typeof gameBoard.tiles[0][0]).toBe({isFilled: false});
    expect(typeof gameBoard.tiles[8][8]).toEqual(undefined);
});

test('places proper amount of ships on tiles', () => {
    const boardFill = gameBoard.createTiles();
    boardFill.populate();
    let count = 0;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (boardFill.tiles[i][j].isFilled === true){
                count++
            }
        }
    }
    expect(boardFill.ships.length).toBe(10);
    expect(count).toBe(30);
});
    // place ships at specific coordinates by calling the ship factory function
    // receiveAttack() 
    //     - accepts coordinates
    //     - if a ship is hit, send the ‘hit’ function to the correct ship
    //     -  else records the coordinates of missed shot
    // missed property tracks missed attacks
    // allSunk() returns T/F if all ships are sunk
