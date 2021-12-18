import _ from "lodash";
import segments from "./values";

function isLc(str) {
  return str === str.toLowerCase();
}

function getNextPoint(point, segment) {
  const re = new RegExp(`${point}|-`, "g");
  const nextPoint = segment.replace(re, "");
  return nextPoint;
}

function strCount(str, substr) {
  return str.split(substr).length - 1;
}

// Don't explore a small cave more than twice, or more than once
// if another small cave has already been explored twice.
function exceedsThreshold(point, map) {
  const count = map[point] || 0;
  return count >= 2 || (Object.values(map).includes(2) && count === 1);
}

export default function day12() {
  function getPaths(path, paths) {
    // Get the last point in the path.
    const point = path.slice(-1)[0];

    if (point === "end") {
      return path;
    }

    const lcMap = path.reduce((acc, point) => {
      if (!isLc(point)) {
        return acc;
      }
      const count = acc[point];
      return { ...acc, [point]: count == null ? 1 : count + 1 };
    }, {});

    const pathStr = path.join(",");
    const nextSegments = segments.filter((s) => {
      return s.includes(point);
    });

    nextSegments.forEach((s) => {
      const nextPoint = getNextPoint(point, s);
      const nextSegment = `${point},${nextPoint}`;

      if (
        // Don't go back to the start
        nextPoint !== "start" &&
        // Don't follow a path we've already gone down more than once
        strCount(pathStr, nextSegment) < 3 &&
        // Don't explore small caves more than a certain # of times
        !exceedsThreshold(nextPoint, lcMap)
      ) {
        const newPath = [...path, nextPoint];
        if (newPath.includes("end")) {
          paths.push(newPath);
        }

        if (nextPoint !== "end") {
          paths = getPaths(newPath, paths);
        }
      }
    });

    return paths;
  }

  const paths = getPaths(["start"], []);

  return <>{paths.length}</>;
}
