const Lab = require('lab');
const Code = require('code');
const Pickme = require('@lucadv/pickme');
const Sinon = require('sinon');
const RPS = require('../');

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const before = lab.before;
const after = lab.after;
const it = lab.it;
const expect = Code.expect;

describe('RPS game', () => {

  describe('(with the 2 moves passed)', () => {

    describe('(both moves valid)', () => {

      describe('rock beats scissors', () => {

        const result = RPS('rock', 'scissors');

        it('should return an object with player 1 as winner', (done) => {
          expect(result.winner).to.equal('player 1');
          expect(result.tie).to.not.exist();
          done();
        });

        it('should return an object with a message indicating that player 1 move beats player 2 move', (done) => {
          expect(result.message).to.equal('rock beats scissors');
          done();
        });

        it('should return an object with the moves of player 1 and player 2', (done) => {
          expect(result.moves.player1).to.equal('rock');
          expect(result.moves.player2).to.equal('scissors');
          done();
        });
      });

      describe('paper beats rock', () => {

        const result = RPS('rock', 'paper');

        it('should return an object with player 2 as winner', (done) => {
          expect(result.winner).to.equal('player 2');
          expect(result.tie).to.not.exist();
          done();
        });

        it('should return an object with a message indicating that player 2 move beats player 1 move', (done) => {
          expect(result.message).to.equal('paper beats rock');
          done();
        });

        it('should return an object with the moves of player 1 and player 2', (done) => {
          expect(result.moves.player1).to.equal('rock');
          expect(result.moves.player2).to.equal('paper');
          done();
        });
      });

      describe('scissors beats paper', () => {

        const result = RPS('scissors', 'paper');

        it('should return an object with player 1 as winner', (done) => {
          expect(result.winner).to.equal('player 1');
          expect(result.tie).to.not.exist();
          done();
        });

        it('should return an object with a message indicating that player 1 move beats player 2 move', (done) => {
          expect(result.message).to.equal('scissors beats paper');
          done();
        });

        it('should return an object with the moves of player 1 and player 2', (done) => {
          expect(result.moves.player1).to.equal('scissors');
          expect(result.moves.player2).to.equal('paper');
          done();
        });
      });

      describe('tie!', () => {

        const result = RPS('rock', 'rock');

        it('should return an object with the tie property set to true', (done) => {
          expect(result.winner).to.not.exist();
          expect(result.tie).to.be.true();
          done();
        });

        it('should return an object with a message indicating that there is a tie!', (done) => {
          expect(result.message).to.equal('Tie!');
          done();
        });

        it('should return an object with the moves of player 1 and player 2', (done) => {
          expect(result.moves.player1).to.equal('rock');
          expect(result.moves.player2).to.equal('rock');
          done();
        });
      });
    });

    describe('(with player 1 move not valid', () => {

      it('should throw an error', (done) => {
        const testFun = () => RPS('foo', 'rock');
        expect(testFun).to.throw(Error, 'player 1 move must be one of rock, paper, scissors');
        done();
      });

    });

    describe('(with player 1 move passed as null)', () => {

      it('should throw an error', (done) => {
        const testFun = () => RPS(null, 'rock');
        expect(testFun).to.throw(Error, 'player 1 move must be one of rock, paper, scissors');
        done();
      });
    });

    describe('(with player 2 move not valid)', () => {

      it('should throw an error', (done) => {
        const testFun = () => RPS('paper', 'foo');
        expect(testFun).to.throw(Error, 'player 2 move must be one of rock, paper, scissors');
        done();
      });

    });

  });

  describe('(with no moves passed)', () => {

    it('should throw an error', (done) => {
      const testFun = () => RPS();
      expect(testFun).to.throw(Error, 'player 1 move must be one of rock, paper, scissors');
      done();
    });
  });

  describe('(with player 2 move not passed', () => {

    let spy;

    before((done) => {
      spy = Sinon.stub(Pickme.prototype, 'pickOne').returns('paper');
      done();
    });

    after((done) => {
      Pickme.prototype.pickOne.restore();
      done();
    });

    it('should randomly pickup a shape for player 2', (done) => {
      const result = RPS('rock');
      expect(result.winner).to.equal('player 2');
      expect(result.tie).to.not.exist();
      expect(result.message).to.equal('paper beats rock');
      expect(result.moves.player1).to.equal('rock');
      expect(result.moves.player2).to.equal('paper');
      expect(spy.calledOnce).to.be.true();
      done();
    });

  });


});
