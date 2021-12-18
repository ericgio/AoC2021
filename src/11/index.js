import rows from "./values";
import { getSurroundingPoints, pointToStr } from "../helpers";

function gridToStr(arr) {
  return arr.map((row) => row.join("")).join("\n");
}

const STEPS = 500;

export default function day11() {
  let grid = rows.slice();
  let gridSize = grid.length * grid[0].length;
  let flashed = [];
  let flashCount = 0;
  let step = 0;

  function maybeIncrementSurroundingPoints(ri, pi) {
    const coords = pointToStr(ri, pi);

    if (grid[ri][pi] > 9 && !flashed.includes(coords)) {
      flashed.push(coords);
      // Increment the adjacent points.
      const adjacent = getSurroundingPoints(ri, pi, grid);
      // console.log(adjacent);
      adjacent.forEach(([rr, pp]) => {
        grid[rr][pp] += 1;
        maybeIncrementSurroundingPoints(rr, pp);
      });
    }
  }

  while (step <= STEPS - 1) {
    step++;

    // Increment each cell value by 1
    grid = grid.map((row, ri) => row.map((val) => val + 1));

    // Flash and increment.
    grid.forEach((row, ri) => {
      row.forEach((_, pi) => {
        maybeIncrementSurroundingPoints(ri, pi);
      });
    });

    // Reset any values greater than 9 to 0.
    grid = grid.map((row, ri) => row.map((val) => (val > 9 ? 0 : val)));

    // Stop if every point has flashed
    if (flashed.length === gridSize) {
      break;
    }

    // Update the flash count and reset the stack.
    flashCount += flashed.length;
    flashed = [];
  }

  return (
    <>
      Step: {step}
      <br />
      Number of flashes: {flashCount}
      <pre>
        <code>{gridToStr(grid)}</code>
      </pre>
    </>
  );
}
