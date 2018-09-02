const Hoek = require('hoek');
const Pickme = require('@lucadv/pickme');
const allowedMoves = ['rock', 'paper', 'scissors'];

const truth = {
  rock: {
    beats: 'scissors'
  },
  scissors: {
    beats: 'paper'
  },
  paper: {
    beats: 'rock'
  }
}

const validateMove = (move, player) => {
  Hoek.assert(allowedMoves.includes(move), `${player} move must be one of ${allowedMoves.join(', ')}`);
}
    
module.exports = (player1Move, player2Move = new Pickme(allowedMoves).pickOne()) => {
  validateMove(player1Move, 'player 1');
  validateMove(player2Move, 'player 2');

  const result = {
    moves: {
      player1: player1Move,
      player2: player2Move
    }
  }

  if (player1Move === player2Move) {
    result.tie = true;
    result.message = 'Tie!';
  } else if (truth[player1Move].beats === player2Move) {
    result.winner = 'player 1';
    result.message = `${player1Move} beats ${player2Move}`;
  } else {
    result.winner = 'player 2';
    result.message = `${player2Move} beats ${player1Move}`;
  }

  return result;
};
