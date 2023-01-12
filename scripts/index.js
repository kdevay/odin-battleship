// 1. Ship factory function
//     - creates ship objects with properties for length, hitCount, and isSunk (bool).
//     - only test methods or properties used outside of ship object (aka only public interface elements)
//     - hit() function increments hitCount
//     - isSunk() returns T/F based on length and hitCount

function ship(length){
    return {
        length: length,
        hitCount: 0,
        hit() { return this.hitCount++ },
        isSunk() { return this.length - this.hitCount > 0 ? false : true }
    }
}

module.exports = ship;