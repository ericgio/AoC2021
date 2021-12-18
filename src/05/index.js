import _ from "lodash";

import values from "./values";

function getNonDiagonalLines(arr) {
  return arr.filter((line) => {
    const [[x1, y1], [x2, y2]] = line
      .split(" -> ")
      .map((point) => point.split(","));

    return +x1 === +x2 || +y1 === +y2;
  });
}

function getDuplicatePoints(arr) {
  const grouped = _.groupBy(arr, (n) => n);
  return _.uniq(_.flatten(_.filter(grouped, (n) => n.length > 1)));
}

function getRange(start, end) {
  return start < end ? _.range(start, end + 1) : _.rangeRight(end, start + 1);
}

export default function day5() {
  // Filter out diagonal values
  let lines = getNonDiagonalLines(values);
  lines = values;

  const points = [];

  // Map the lines on the grid
  lines.forEach((line) => {
    let [[x1, y1], [x2, y2]] = line
      .split(" -> ")
      .map((point) => point.split(",").map((coord) => +coord));

    // Horizontal
    if (x1 === x2) {
      getRange(y1, y2).forEach((y) => {
        points.push(`${x1},${y}`);
      });
    } else if (y1 === y2) {
      getRange(x1, x2).forEach((x) => {
        points.push(`${x},${y1}`);
      });
    } else {
      // Diagonal
      const yVals = getRange(y1, y2);
      getRange(x1, x2).forEach((x, idx) => {
        points.push(`${x},${yVals[idx]}`);
      });
    }
  });

  return <>Count: {getDuplicatePoints(points).length}</>;
}
