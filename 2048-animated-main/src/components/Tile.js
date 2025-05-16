import React from "react";

// Компонент для отображения плитки
function Tile({ tile }) {
  // Список классов для плитки
  let classes = ["tile"];

  // Добавляем класс для значения плитки (например, tile2, tile4 и т.д.)
  classes.push("tile" + tile.value);

  // Если плитка не слилась с другой
  if (!tile.mergedInto) {
    // Добавляем класс с позицией (например, position_0_0)
    classes.push(`position_${tile.row}_${tile.column}`);
  }

  // Если плитка слилась с другой
  if (tile.mergedInto) {
    classes.push("merged");
  }

  // Если плитка новая
  if (tile.isNew()) {
    classes.push("new");
  }

  // Если плитка двигалась
  if (tile.hasMoved()) {
    // Добавляем классы для анимации движения
    classes.push(`row_from_${tile.fromRow()}_to_${tile.toRow()}`);
    classes.push(`column_from_${tile.fromColumn()}_to_${tile.toColumn()}`);
    classes.push("isMoving");
  }

  // Объединяем все классы в одну строку
  let classString = classes.join(" ");

  // Возвращаем плитку
  return <span className={classString}></span>;
}

export default Tile;
