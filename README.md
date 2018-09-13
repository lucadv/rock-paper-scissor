# Overview

A module to play Rock, Paper, Scissors game. Given Player 1 and Player 2 moves the module will decide who wins.

## Usage

Call RPS with the 2 moves (if the second move is not passed one will be generated randomly) and you'll be returned with an object containing the following properties:

  * `winner`: the winner of the game if there is one (could be tie), either `player 1` or `player 2``
  * `tie`: true if the 2 players played the same shape (e.g. rock vs rock). This field is mutually exclusive with `winner`
  * `message`: the result message of the game (e.g. `paper beats rock`)
  * `moves`: an object representing the moves of player 1 and player 2

Install @lucadv/rock-paper-scissors:

```bash
npm install --save @lucadv/rock-paper-scissors
```

Then use it like this:

```javascript
const RPS = require('@lucadv/rock-paper-scissors');

const player1Move = 'rock';
const player2Move = 'paper';

const result = RPS(player1Move, player2Move); 
// { winner: 'player2', message: 'paper beats rock', moves: { player1: 'rock', 'player2': 'paper' } }
```

If you don't pass player2Move, a shape will be picked randomly. 
