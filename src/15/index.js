import _ from "lodash";
import values from "./values";
import { getAdjacentPoints, toInt } from "../helpers";

const grid = values.map((row) => row.split("").map(toInt));

const visitedMap = grid.reduce((acc, row, ri) => {
  row.forEach((point, pi) => {
    acc[`${ri},${pi}`] = false;
  });
  return acc;
}, {});
visitedMap["0,0"] = true;

// Only deal with adjacent points that move the path forward.
function getNextPoints(x, y) {
  return getAdjacentPoints(x, y, grid).filter((p) => {
    const [xx, yy] = p;
    return xx >= x && yy >= y;
  });
}

function getPointStr(x, y) {
  return `${x},${y}`;
}

function getPointDuple(str) {
  return str.split(",").map(toInt);
}

function getPathStr(arr) {
  return arr.join(" ");
}

function getPointValue(x, y) {
  return grid[x][y];
}

function getPaths(path, paths, max) {
  // Get the last point in the path, eg: '4,7'
  const point = path.slice(-1)[0];
  const pathStr = getPathStr(path);
  const pathValue = paths[pathStr].value;

  if (point === max) {
    return paths;
  }

  const nextPoints = getNextPoints(...getPointDuple(point));

  // Remove the old path
  delete paths[pathStr];

  nextPoints.forEach((p) => {
    const pointStr = getPointStr(...p);
    const newPath = [...path, pointStr];
    const value = getPointValue(...p);
    const newPathStr = newPath.join(" ");

    // Add the new path and increment the value
    paths[newPathStr] = {
      path: newPathStr,
      value: pathValue + value
    };

    if (pointStr !== max) {
      paths = getPaths(newPath, paths, max);
    }
  });

  return paths;
}

export default function day15() {
  // let paths = {
  //   [start]: {
  //     path: start,
  //     value: 0
  //   }
  // };

  // paths = getPaths([start], paths, max);
  // const vals = _.sortBy(Object.values(paths), "value");
  // const min = _.minBy(vals, "value");

  // 0, 0,1 1,0

  function setValues(point, map) {
    const [r, c] = getPointDuple(point);
    const next = getNextPoints(r, c);

    next.forEach(([rr, cc]) => {
      const str = getPointStr(rr, cc);
      const pointScore = grid[rr][cc];
      const value = map[point] + pointScore;

      map[str] = map[str] ? Math.min(value, map[str]) : value;

      if (!visitedMap[str]) {
        map = setValues(str, map);
        // Set unvisited points to true so they're not re-visited.
        // Set the point's cumulative value.
        // map[str] = value;
      }
      visitedMap[str] = true;
    });
    return map;
  }

  // console.log(map);
  const start = "0,0";
  const end = "9,9";
  let map = { [start]: 0 };
  map = setValues(start, map);
  // console.log(map, map[end], map["2,2"]);

  // return <>Min value: {min.value}</>;
}
