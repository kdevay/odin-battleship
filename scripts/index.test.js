const ship = require('./index');

test('initially returns an empty ship object of a certain length', () => {
    expect(ship(1).length).toBe(1);
    expect(ship(1).hitCount).toBe(0);
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