import values from "./values";

function getSum(i) {
  return +values[i] + +values[i + 1] + +values[i + 2];
}

function getAnswer01() {
  let increased = 0;
  for (let ii = 1; ii < values.length; ii++) {
    if (+values[ii] > +values[ii - 1]) {
      increased += 1;
    }
  }
  return increased;
}

function getAnswer02() {
  let groupIncreased = 0;
  for (let ii = 1; ii <= values.length - 3; ii++) {
    if (getSum(ii) > getSum(ii - 1)) {
      groupIncreased += 1;
    }
  }
  return groupIncreased;
}

export default function day01() {
  return (
    <>
      Increased: {getAnswer01()}
      <br />
      Group Increased: {getAnswer02()}
    </>
  );
}
