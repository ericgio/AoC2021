function getStartIndex(index) {
  return Math.max(index - 1, 0);
}

function getEndIndex(index, max) {
  return Math.min(index + 1, max);
}

export function pointToStr(ri, ci) {
  return `${ri},${ci}`;
}

/**
 * Get all the points surrounding a given point on a grid.
 *
 * XXX
 * X·X
 * XXX
 */
export function getSurroundingPoints(ri, ci, grid) {
  let surrounding = [];
  let rr = getStartIndex(ri);
  while (rr <= getEndIndex(ri, grid.length - 1)) {
    let cc = getStartIndex(ci);
    while (cc <= getEndIndex(ci, grid[rr].length - 1)) {
      const coord = pointToStr(rr, cc);
      // Exclude the point itself.
      if (coord !== pointToStr(ri, ci)) {
        surrounding.push([rr, cc]);
      }
      cc++;
    }
    rr++;
  }
  return surrounding;
}

/**
 * Get all points to the left, right, top, or bottom of a
 * point on a grid.
 *
 *  x
 * x·x
 *  x
 */
export function getAdjacentPoints(ri, ci, grid) {
  // Get all the surrounding points and filter out the diagonals.
  return getSurroundingPoints(ri, ci, grid).filter(
    ([rr, cc]) => rr === ri || cc === ci
  );
}

export function toInt(str) {
  return parseInt(str, 10);
}

export function getGridBounds(grid) {
  return grid.reduce(
    (acc, p) => {
      const [x, y] = p.split(",").map(toInt);
      if (x < acc.xMin) acc.xMin = x;
      if (x > acc.xMax) acc.xMax = x;
      if (y < acc.yMin) acc.yMin = y;
      if (y > acc.yMax) acc.yMax = y;
      return acc;
    },
    { xMin: 0, xMax: 0, yMin: 0, yMax: 0 }
  );
}

export function sortInt(a, b) {
  return a - b;
}
