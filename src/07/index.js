import _ from "lodash";
import values from "./values";

function getMinMax(input) {
  const min = _.min(input);
  const max = _.max(input);

  return { min, max };
}

function getMinValueLinear(input) {
  const { min, max } = getMinMax(input);

  const vals = [];
  for (let ii = min; ii <= max; ii++) {
    vals[ii] = input.reduce((acc, v) => {
      const steps = Math.abs(v - ii);
      acc += steps;
      return acc;
    }, 0);
  }

  const minVal = _.min(vals);

  return [vals.indexOf(minVal), minVal];
}

function getMinValue(input) {
  const { min, max } = getMinMax(input);

  const vals = [];
  for (let ii = min; ii <= max; ii++) {
    vals[ii] = input.reduce((acc, v) => {
      const steps = Math.abs(v - ii);
      const stepRange = _.range(0, steps + 1);
      acc += stepRange.reduce((acc, v) => {
        acc += v;
        return acc;
      }, 0);
      return acc;
    }, 0);
  }

  const minVal = _.min(vals);

  return [vals.indexOf(minVal), minVal];
}

export default function day7() {
  const [positionLinear, minValLinear] = getMinValueLinear(values);
  const [position, minVal] = getMinValue(values);

  return (
    <>
      Total values: {values.length}
      <h3>Linear</h3>
      Min fuel value: {minValLinear}
      <br />
      Position: {positionLinear}
      <h3>Non-Linear</h3>
      Min fuel value: {minVal}
      <br />
      Position: {position}
    </>
  );
}
