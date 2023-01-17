import {ship, GameBoard} from './index.js';


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

test('creates blank 8x8 game board', () => {
    const board = new GameBoard('computer');
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            expect(board.tiles[i][j].isFilled).toBe(false);
            expect(board.tiles[i][j].display).toBe(null);
            expect(board.tiles[i][j].ship).toBe(null);
        }
    }
});

test('places proper amount of ships on tiles', () => {
    let boardFill = new GameBoard('computer');
    boardFill.ships.forEach(ship => boardFill.populate(ship))
    let testShip;
    let count = 0;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (boardFill.tiles[i][j].isFilled === true){
                if (!testShip) { testShip = boardFill.tiles[i][j].ship }
                count++
            }
        }
    }
    expect(testShip).not.toBe(null);
    expect(boardFill.ships.length).toBe(10);
    expect(count).toBe(30);
});

test('passes attack data to proper ship and tracks misses', () => {
    let boardAction = new GameBoard('computer');
    boardAction.ships.forEach(ship => boardAction.populate(ship))
    // Find an empty tile to test misses
    let missCoord;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (boardAction.tiles[i][j].isFilled === false){ 
                missCoord = [i, j];
                break;
            }
        }
        if (missCoord){ break }
    }
    // Attacks on empty tiles should return false
    expect(boardAction.receiveAttack(missCoord[0], missCoord[1])).toBe(false);
    // Misses should be added to misses property
    expect(boardAction.misses[0][0]).toBe(missCoord[0]);
    expect(boardAction.misses[0][1]).toBe(missCoord[1]);

    // Find first ship's location to test hits
    let hitCoord = boardAction.ships[0].location[0]; // = [a, b]
    // Attacks on occupied tiles should return true
    expect(boardAction.receiveAttack(hitCoord[0], hitCoord[1])).toBe(true);
    // Hits should be recorded in ship hit count
    expect(boardAction.ships[0].hitCount).toBe(1);
});

test('returns true/false if all ships are sunk', () => {
    let boardFloat = new GameBoard('computer');
    boardFloat.ships.forEach(ship => boardFloat.populate(ship))
    expect(boardFloat.allSunk()).toBe(false);

    let boardSink = new GameBoard('computer');
    boardSink.ships.forEach(ship => boardSink.populate(ship))
    boardSink.ships.forEach(ship => {
        let count = 0;
        while(count < ship.length) {
            ship.hit();
            count++; 
        }
    })
    expect(boardSink.allSunk()).toBe(true);
});

