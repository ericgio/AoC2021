import _ from "lodash";
import { pointToStr, toInt } from "../helpers";

// TEST
// target area: x=20..30, y=-10..-5

// REAL
// target area: x=150..193, y=-136..-86

const grid = [];
let yy = -10;
while (yy <= -5) {
  let xx = 20;
  while (xx <= 30) {
    grid.push(`${xx},${yy}`);
    xx++;
  }
  yy++;
}

const rangeX = _.range(20, 31);
const rangeY = _.range(-5, -11);
// console.log(rangeX, rangeY);

function pointStrToArr(str: string): number[] {
  return str.split(",").map(toInt);
}

// Get the max height of the trajectory.
function getApex(arr: string[]) {
  let max = -Infinity;
  arr.forEach((point) => {
    const [x, y] = pointStrToArr(point);
    if (y > max) {
      max = y;
    }
  });
  return max;
}

/**
 * - The probe's x position increases by its x velocity.
 * - The probe's y position increases by its y velocity.
 * - Due to drag, the probe's x velocity changes by 1 toward 0;
 *   that is, it decreases by 1 if it is greater than 0,
 *   increases by 1 if it is less than 0,
 *   or does not change if it is already 0.
 * - Due to gravity, the probe's y velocity decreases by 1.
 */
function getTrajectory(velocity: string, start: string) {
  let [xv, yv] = pointStrToArr(velocity);
  let [xp, yp] = pointStrToArr(start);

  const yMin = Math.min(...rangeY);
  // const [xm, ym] = pointStrToArr(max);

  let trajectory = [start];

  // TODO: progressively check if a point is contained in the grid
  // and stop early if it is?
  while (yp >= yMin) {
    const prevX = xp;

    // x position increases by its x velocity.
    xp += xv;
    // y position increases by its y velocity.
    yp += yv;

    if (xv > 0) {
      xv -= 1;
    } else if (xv < 0) {
      xv += 1;
    }

    yv -= 1;

    const point = `${xp},${yp}`;
    trajectory.push(point);

    if (grid.includes(point)) {
      // Stop once we know we've entered the grid.
      break;
    }

    // We've reached terminal x velocity and are simply falling.
    // If x is outside the bounds of the grid we'll never hit it.
    if (xp === prevX && !rangeX.includes(xp)) {
      break;
    }
  }
  return trajectory;
}

export default function day17() {
  const start = "0,0";
  const max = "30,-10";

  // Create a grid based on the points.

  // Get all possible trajectories.
  const trajectory = getTrajectory("6,3", start);

  // Get the max y value for each trajectory.

  // console.log(trajectory, getApex(trajectory));
}
