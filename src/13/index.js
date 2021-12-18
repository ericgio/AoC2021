import _ from "lodash";

import values from "./values";
import { getGridBounds, toInt } from "../helpers";

let [grid, folds] = values;
grid = grid.split("\n");
folds = folds.split("\n").map((f) => f.replace("fold along ", ""));

function getFoldedValue(value, foldValue) {
  return Math.abs(+foldValue * 2 - +value);
}

function getFoldedGrid(axis, value, g) {
  let folded = [];
  g.forEach((p) => {
    const [x, y] = p.split(",").map(toInt);

    let point = p;
    switch (axis) {
      case "y":
        if (y > +value) {
          point = `${x},${getFoldedValue(y, value)}`;
        }
        break;
      case "x":
        if (x > +value) {
          point = `${getFoldedValue(x, value)},${y}`;
        }
        break;
      default:
        break;
    }

    folded.push(point);
  });

  return _.uniq(folded);
}

function printGrid(grid) {
  const { xMin, xMax, yMin, yMax } = getGridBounds(grid);

  let gridStr = "";
  let yy = yMin;
  while (yy <= yMax) {
    let xx = xMin;
    while (xx <= xMax) {
      gridStr += grid.includes(`${xx},${yy}`) ? "#" : " ";
      xx++;
    }
    gridStr += "\n";
    yy++;
  }
  return gridStr;
}

export default function day13() {
  const [axis, value] = folds[0].split("=");

  const fold1 = getFoldedGrid(axis, value, grid);

  let newGrid = grid.slice();
  folds.forEach((fold) => {
    const [a, v] = fold.split("=");
    newGrid = getFoldedGrid(a, v, newGrid);
  });

  return (
    <>
      Points after fold 1: {Object.keys(fold1).length}
      <pre>
        <code>{printGrid(newGrid)}</code>
      </pre>
    </>
  );
}
