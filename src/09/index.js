import values from "./values";
import {
  getAdjacentPoints,
  getSurroundingPoints,
  pointToStr
} from "../helpers";

function getLowPoints(grid) {
  const lowPoints = [];
  grid.forEach((points, ri) => {
    points.forEach((point, pi) => {
      const surroundingPoints = getSurroundingPoints(ri, pi, grid);
      if (surroundingPoints.every(([rr, pp]) => point <= grid[rr][pp])) {
        lowPoints.push([ri, pi]);
      }
    });
  });
  return lowPoints;
}

function day9() {
  const grid = values.map((r) => r.split("").map((n) => +n));

  const lowPoints = getLowPoints(grid);
  const riskLevel = lowPoints.reduce(
    (acc, [ri, pi]) => (acc += grid[ri][pi] + 1),
    0
  );

  function getBasinPoints(ri, pi, basin) {
    getAdjacentPoints(ri, pi, grid).forEach(([rr, pp]) => {
      const pointStr = pointToStr(rr, pp);
      if (grid[rr][pp] < 9 && !basin.includes(pointStr)) {
        basin.push(pointStr);
        getBasinPoints(rr, pp, basin);
      }
    });
    return basin;
  }

  let basins = [];
  lowPoints.forEach(([ri, pi]) => {
    // Each basin includes the low point.
    const basin = [pointToStr(ri, pi)];
    basins.push(getBasinPoints(ri, pi, basin));
  });

  // Get each basin based on the low points.
  const product = basins
    // Get the size of each basin
    .map((b) => b.length)
    // Sort in descending order
    .sort((a, b) => b - a)
    // Get the 3 largest basins
    .slice(0, 3)
    // Multiply their sizes
    .reduce((acc, v) => (acc *= v), 1);

  return (
    <>
      Low points: {lowPoints.length}
      <br />
      Risk level: {riskLevel}
      <br />
      Product: {product}
    </>
  );
}

export default day9;
