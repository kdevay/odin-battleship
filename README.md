1. Ship factory function
    - creates ship objects with properties for length, hitCount, and isSunk (bool).
    - only test methods or properties used outside of ship object (aka only public interface elements)
    - hit() function increments hitCount
    - isSunk() returns T/F based on length and hitCount

2. Gameboard factory
    - place ships at specific coordinates by calling the ship factory function, and tracks/displays missed attacks
    - receiveAttack() 
        - accepts coordinates
        - if a ship is hit, send the ‘hit’ function to the correct ship
        -  else records the coordinates of missed shot
    - missed property tracks missed attacks
    - allSunk() returns T/F if all ships are sunk

3. Players - PvC
    - Players take turns attacking the enemy Gameboard
    - Randomize moves for computer player - it should know whether or not a given move is legal. and shouldn’t shoot the same bad coordinate twice.

4. Create the main game loop and a module for DOM interaction.
    - display both boards
    - create method for rendering gameboards
    - get attacks from the user clicking on the enemy Gameboard.
    - game loop should set up a new game by creating Players and Gameboards. 
    - populate each Gameboard with predetermined coordinates. (de-prioritize allowing players to place their ships later.)
    - The game loop should step through the game using only methods from other objects. 
    - Any new functions derived while writing game loop should reside in gameboard, ship, or player.
    - game ends once one players ships have all been sunk. This function is appropriate for the Game module.

5. Finish it up
    - letting users place their ships: them type coordinates for each ship, or drag and drop ships to coordinates.
    - polish the intelligence of the computer player: try adjacent slots after getting a ‘hit’.
    - create a 2 player option that lets users take turns by passing the device back and forth.* ß
    - *(optimize for mobile, and implement a ‘pass device’ modal to hide boards between turns!)