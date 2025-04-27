import React, { useState } from 'react';
import styled from 'styled-components';

// Стилизованные компоненты
const AppContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const Status = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
`;

const BoardRow = styled.div`
  display: flex;
  justify-content: center;
`;

const SquareButton = styled.button`
  width: 60px;
  height: 60px;
  font-size: 24px;
  margin: 5px;
  background-color: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`;

const GameButton = styled.button`
  background-color: #f1f1f1;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin: 5px 0;
  &:hover {
    background-color: #ddd;
  }
`;

const Board = ({ xIsNext, squares, onPlay }) => {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <AppContainer>
      <Status>{status}</Status>
      <BoardRow>
        {[0, 1, 2].map(i => (
          <SquareButton key={i} onClick={() => handleClick(i)}>
            {squares[i]}
          </SquareButton>
        ))}
      </BoardRow>
      <BoardRow>
        {[3, 4, 5].map(i => (
          <SquareButton key={i} onClick={() => handleClick(i)}>
            {squares[i]}
          </SquareButton>
        ))}
      </BoardRow>
      <BoardRow>
        {[6, 7, 8].map(i => (
          <SquareButton key={i} onClick={() => handleClick(i)}>
            {squares[i]}
          </SquareButton>
        ))}
      </BoardRow>
    </AppContainer>
  );
};

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <GameButton onClick={() => jumpTo(move)}>{description}</GameButton>
      </li>
    );
  });

  return (
    <AppContainer>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </AppContainer>
  );
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

