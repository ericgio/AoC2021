import values from "./values";

function getCount(arr, end) {
  // Initialize the map
  const map = arr.reduce((acc, val) => {
    acc[val] += 1;
    return acc;
  }, Array(9).fill(0));

  for (let ii = 1; ii <= end; ii++) {
    const last = map[0];
    for (let jj = 0; jj < map.length - 1; jj++) {
      map[jj] = map[jj + 1];
    }
    map[6] += last;
    map[8] = last;
  }

  return map.reduce((acc, v) => (acc += v), 0);
}

export default function day6() {
  const days = 256;
  const count = getCount(values, days);

  return (
    <>
      After {days} days: {count} fish
    </>
  );
}
