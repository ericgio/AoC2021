import values from "./values";

const [template] = values;
const rules = values[1].split("\n");

const pairMap = rules.reduce((acc, rule) => {
  const [pair] = rule.split(" -> ");
  acc[pair] = 0;
  return acc;
}, {});

const ruleMap = rules.reduce((acc, rule) => {
  const [pair, insert] = rule.split(" -> ");
  acc[pair] = [`${pair[0]}${insert}`, `${insert}${pair[1]}`];
  return acc;
}, {});

function getPairCountMap(map) {
  const newMap = { ...pairMap };
  Object.keys(map).forEach((pair) => {
    const count = map[pair];
    if (count) {
      ruleMap[pair].forEach((ii) => {
        newMap[ii] += count;
      });
    }
  });
  return newMap;
}

export default function day14() {
  let map = { ...pairMap };
  let ii = 0;

  // Init the map with values from the template
  while (ii < template.length - 1) {
    const pair = template.slice(ii, ii + 2);
    map[pair] += 1;
    ii++;
  }

  let step = 1;
  while (step <= 10) {
    step++;
    map = getPairCountMap(map);
  }

  const charCount = Object.keys(map).reduce((acc, pair) => {
    pair.split("").forEach((ch) => {
      acc[ch] = acc[ch] ? acc[ch] + map[pair] : map[pair];
    });
    return acc;
  }, {});

  // Divide each count by 2
  Object.keys(charCount).forEach((ch) => {
    charCount[ch] = charCount[ch] / 2;
  });

  // Get min & max values
  const counts = Object.values(charCount).map(Math.round);
  const max = Math.max(...counts);
  const min = Math.min(...counts);

  return <>{max - min}</>;
}
