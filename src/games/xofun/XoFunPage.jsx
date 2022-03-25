import ReactDOM from "react-dom";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const XoFunGame = () => {
  const rootElement = document.getElementById("root");
  const INIT_HISTORY = [
    {
      squares: Array(9).fill(null),
    },
  ];

  const INIT_STATE = {
    history: INIT_HISTORY,
    playerIsNext: true,
    stepNumber: 0,
    player: null,
    winner: null,
  };

  const GameInfo = (props) => {
    const { player, playerIsNext, history, winner, onClick, stepNumber } =
      props;

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (player) {
      const opponent = player === "X" ? "O" : "X";
      status = "Next player: " + (playerIsNext ? player : opponent);
    } else {
      status = "Select X or O";
    }

    const moves =
      history.length <= 1 || winner
        ? []
        : history.map((step, move) => {
            let moveText = "Move #" + move;
            moveText = stepNumber === move ? <b>{moveText}</b> : moveText;

            const desc = move ? moveText : <b>Game start</b>;

            return (
              <div key={move}>
                <a href="#" onClick={() => onClick(move)}>
                  {desc}
                </a>
              </div>
            );
          });

    return (
      <div className="xo-game-info">
        <div>{status}</div>
        <div className="xo-game-history">{moves}</div>
      </div>
    );
  };

  const Square = (props) => {
    const { onClick, value } = props;
    return (
      <button className="btn btn-primary xo-square" onClick={onClick}>
        {value}
      </button>
    );
  };

  const ChoosePlayer = (props) => {
    const { onClick, player } = props;

    if (player) {
      return null;
    }

    return (
      <div className="xo-game">
        <div className="xo-board-row">
          <Square value="X" onClick={() => onClick("X")} />
          <Square value="O" onClick={() => onClick("O")} />
        </div>
      </div>
    );
  };

  class BoardXO extends React.Component {
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }

    render() {
      if (!this.props.player) {
        return null;
      }

      return (
        <div className="xo-game">
          <div>
            <div className="xo-board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="xo-board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="xo-board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        </div>
      );
    }
  }

  class TicTacToeGame extends React.Component {
    constructor() {
      super();
      this.state = INIT_STATE;
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        playerIsNext: step % 2 ? false : true,
        winner: null,
      });
    }

    resetGame(player) {
      this.setState({ ...INIT_STATE, player: player });
    }

    setPlayer(player) {
      this.setState({
        player: player,
      });
    }

    setMove(i) {
      const { stepNumber, player, playerIsNext, winner } = this.state;

      const history = this.state.history.slice(0, stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();

      if (winner || squares[i]) {
        return;
      }

      const opponent = player === "X" ? "O" : "X";
      squares[i] = playerIsNext ? player : opponent;

      const hasEmptyIndex = squares.some((s) => {
        return s != "O" && s != "X";
      });

      // was there a winner or an even?
      let nextWinner = calculateWinner(squares);

      if (!nextWinner && !hasEmptyIndex) {
        nextWinner = "-";
      }

      this.setState({
        history: history.concat([
          {
            squares: squares,
          },
        ]),
        stepNumber: history.length,
        playerIsNext: !playerIsNext,
        winner: nextWinner,
      });
    }

    handleClick(i) {
      const { playerIsNext, winner } = this.state;

      if (playerIsNext && !winner) {
        this.setMove(i);
      }
    }

    render() {
      const { history, stepNumber, playerIsNext, player, winner } = this.state;

      const current = history[stepNumber];

      if (winner) {
        // there was a winner, reset the game
        // or no more moves! game over!
        // restart game anyway
        setTimeout(() => {
          this.resetGame(player);
        }, 2000);
      } else if (!playerIsNext) {
        // now the computer has to play in a sec
        let emptyIndex = 0;
        const hasEmptyIndex = current.squares.some((s, idx) => {
          if (s != "O" && s != "X") {
            emptyIndex = idx;
            return true;
          }
        });
        if (!hasEmptyIndex) {
          // no more moves! game over!
          console.log("kind of error, no more moves! game over!");
        } else {
          // computer's move in 2 secs
          const computer = player === "X" ? "O" : "X";
          const bestMove = calcMinimax(
            current.squares,
            computer,
            player,
            computer
          );

          setTimeout(() => {
            this.setMove(bestMove);
          }, 500);
        }
      }

      return (
        <div className="xo-container">
          <div className="row">
            <div className="xo-game-title">
              <h3>Tic Tac Toe</h3>
              <h4>A React Game, not unbeatable</h4>
            </div>
          </div>
          <div className="row">
            <ChoosePlayer
              player={player}
              squares={current.squares}
              onClick={(i) => this.setPlayer(i)}
            />
            <BoardXO
              player={player}
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="row">
            <GameInfo
              stepNumber={stepNumber}
              player={player}
              playerIsNext={playerIsNext}
              history={history}
              winner={winner}
              onClick={(move) => this.jumpTo(move)}
            />
          </div>
        </div>
      );
    }
  }

  //ReactDOM.render(<TicTacToeGame />, document.getElementById("root"));

  // returns list of the indexes of empty spots on the board
  function emptyIndexies(squares) {
    return squares.reduce((acc, val, idx) => {
      if (!val) {
        acc.push(idx);
      }
      return acc;
    }, []);
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function isWinner(squares, player) {
    return calculateWinner(squares) === player;
  }

  function calcMinimax(squares, playerToHelp, human, computer) {
    function calcScores(squares, availSpots, depth) {
      if (isWinner(squares, computer)) {
        // player
        // computer would win
        if (computer === playerToHelp) {
          return 10 - depth;
        } else {
          return depth - 10;
        }
      } else if (isWinner(squares, human)) {
        // opponent
        // human would win
        if (human === playerToHelp) {
          return 10 - depth;
        } else {
          return depth - 10;
        }
      } else if (availSpots.length === 0) {
        // no more moves available, it is a draw
        return 0;
      }

      return null;
    }

    // the main minimax function
    function minimax(squares, player, depth) {
      // available spots
      const availSpots = emptyIndexies(squares);

      //
      const result = calcScores(squares, availSpots, depth);

      if (result) {
        return result; // terminate
      }

      const scores = [];
      // loop through available spots
      // fill moves and scores
      const moves = availSpots.map((val, idx) => {
        const nextPlayer = player === human ? computer : human;

        //move to test with current player
        squares[val] = player; // e.g. set "X" at the idx place
        //recursive with depth+1

        const score = minimax(squares, nextPlayer, depth + 1);
        scores.push(score);
        //reverse move
        squares[val] = null;
        return val; // moves.push move
      });

      let scoreIndex = 0;
      if (player === playerToHelp) {
        // playerToHelp has to maximize its points: max calc
        scoreIndex = scores.reduce(
          (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
          0
        );
      } else {
        // opponents wants to minimize playerToHelp points: min calc
        scoreIndex = scores.reduce(
          (iMin, x, i, arr) => (x < arr[iMin] ? i : iMin),
          0
        );
      }

      if (depth === 0) {
        return moves[scoreIndex]; // best move
      }
      return scores[scoreIndex];
    }

    const res = minimax(squares, playerToHelp, 0);
    return res;
  }

  return (
    <div>
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">XO</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Activity</Link>
                  </li>
                  <li>Activity 3</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id="gameSpinner" name="gameSpinner"></div>

      <section className="tf-activity s1 tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-5"></div>
            <div className="col-4">
              <TicTacToeGame />
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default XoFunGame;
