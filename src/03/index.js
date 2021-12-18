import values from "./values";

function getSums(arr) {
  return arr.reduce((acc, num) => {
    acc.forEach((_, idx) => {
      acc[idx] += +num[idx];
    });
    return acc;
  }, Array(arr[0].length).fill(0, 0));
}

function checkAndFilter(arr, index, mapBy) {
  const sums = getSums(arr).map((sum) => mapBy(sum, arr));
  const filtered = arr.filter((v) => +v[index] === +sums[index]);

  return filtered.length > 1
    ? checkAndFilter(filtered, index + 1, mapBy)
    : filtered[0];
}

const threshold = values.length / 2;

function getGammaRate() {
  const bin = getSums(values)
    .map((sum) => (sum > threshold ? 1 : 0))
    .join("");
  return parseInt(bin, 2);
}

function getEpsilonRate() {
  const bin = getSums(values)
    .map((sum) => (sum > threshold ? 0 : 1))
    .join("");
  return parseInt(bin, 2);
}

function getOxygenRating() {
  const val = checkAndFilter(values, 0, (sum, arr) =>
    sum >= arr.length / 2 ? 1 : 0
  );
  return parseInt(val, 2);
}

function getCo2Rating() {
  const val = checkAndFilter(values, 0, (sum, arr) =>
    sum >= arr.length / 2 ? 0 : 1
  );
  return parseInt(val, 2);
}

export default function day3() {
  const gamma = getGammaRate();
  const epsilon = getEpsilonRate();
  const o2 = getOxygenRating();
  const co2 = getCo2Rating();

  return (
    <>
      Gamma rate: {gamma}
      <br />
      Epsilon rate: {epsilon}
      <br />
      Power consumption: {gamma * epsilon}
      <br />
      ------------------------------
      <br />
      Oxygen generator rating: {o2}
      <br />
      CO2 scrubber rating: {co2}
      <br />
      Life support rating: {o2 * co2}
    </>
  );
}
