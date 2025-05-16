import React, { useState } from "react";
import Tile from "./Tile";
import Cell from "./Cell";
import { Board } from "../helper";
import useEvent from "../hooks/useEvent";
import GameOverlay from "./GameOverlay";

// Главный компонент игры
function BoardView() {
  // Создаем новую игру
  const [board, setBoard] = useState(new Board());

  // Обработка нажатия клавиш
  function handleKeyDown(event) {
    // Если игра выиграна, ничего не делаем
    if (board.hasWon()) {
      return;
    }

    // Проверяем, что нажата стрелка
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      // Получаем направление (0 - влево, 1 - вверх, 2 - вправо, 3 - вниз)
      let direction = event.keyCode - 37;
      
      // Создаем копию доски
      let boardCopy = Object.assign(
        Object.create(Object.getPrototypeOf(board)),
        board
      );
      
      // Делаем ход
      let newBoard = boardCopy.move(direction);
      
      // Обновляем доску
      setBoard(newBoard);
    }
  }

  // Подключаем обработчик клавиш
  useEvent("keydown", handleKeyDown);

  // Создаем сетку клеток
  function createCells() {
    return board.cells.map((row, rowIndex) => {
      return (
        <div key={rowIndex}>
          {row.map((col, colIndex) => {
            return <Cell key={rowIndex * board.size + colIndex} />;
          })}
        </div>
      );
    });
  }

  // Создаем плитки
  function createTiles() {
    return board.tiles
      .filter((tile) => tile.value !== 0)
      .map((tile, index) => {
        return <Tile tile={tile} key={index} />;
      });
  }

  // Начать новую игру
  function resetGame() {
    setBoard(new Board());
  }

  // Рисуем игру
  return (
    <div>
      {/* Верхняя панель с кнопкой и счетом */}
      <div className="details-box">
        <div className="resetButton" onClick={resetGame}>
          NEW GAME
        </div>
        <div className="score-box">
          <div className="score-header">SCORE</div>
          <div>{board.score}</div>
        </div>
      </div>

      {/* Игровое поле */}
      <div className="board">
        {createCells()}
        {createTiles()}
        <GameOverlay onRestart={resetGame} board={board} />
      </div>
    </div>
  );
}

export default BoardView;
