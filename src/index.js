import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
  }

  render() {

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor() {
    super();
    this.state = {
        history: [{
            squares: Array(9).fill(null)
        }],
        isXTurn: true,
        stepNumber: 0
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = checkForWin(current.squares);

    const moves = history.map((step, move) => {
    const desc = move ?
        'Move #' + move :
        'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Take your turn: ' + (this.state.isXTurn ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.squareClicked(i)}/>
        </div>
        <div className="game-info">
        <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      isXTurn: (step % 2) === 0,
    });
  }
 
  squareClicked(i)
    {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (checkForWin(squares) || squares[i])
        {
            return;
        }

        squares[i] = this.state.isXTurn ? 'X' : 'O';
        this.setState({history: history.concat([{ squares: squares}]), isXTurn: !this.state.isXTurn, stepNumber: history.length});
    }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


 function checkForWin(squares) {

        if (squares[0] == squares[1] && squares[1] == squares[2] && squares[0] != null && squares[1] != null && squares[2] != null)
        {
            return squares[0];
        }
        else if (squares[3] == squares[4] && squares[4] == squares[5] && squares[3] != null && squares[4] != null && squares[5] != null)
        {
             return squares[3];
        }
        else if (squares[6] == squares[7] && squares[7] == squares[8] && squares[6] != null && squares[7] != null && squares[8] != null)
        {
             return squares[6];
        }
        else if (squares[0] == squares[3] && squares[3] == squares[6] && squares[0] != null && squares[3] != null && squares[6] != null)
        {
             return squares[0];
        }
        else if (squares[1] == squares[4] && squares[4] == squares[7] && squares[1] != null && squares[4] != null && squares[7] != null)
        {
             return squares[1];
        }
        else if (squares[2] == squares[5] && squares[5] == squares[8] && squares[2] != null && squares[5] != null && squares[8] != null)
        {
             return squares[2];
        }
        else if (squares[0] == squares[4] && squares[4] == squares[8] && squares[0] != null && squares[4] != null && squares[8] != null)
        {
             return squares[0];
        }
        else if (squares[2] == squares[4] && squares[4] == squares[6] && squares[2] != null && squares[4] != null && squares[6] != null)
        {
             return squares[2];
        }
    }
