import _ from "lodash";
import lines from "./values";

const toMap = (acc, char) => {
  acc[char] = true;
  return acc;
};

const openTags = ["(", "[", "{", "<"].reduce(toMap, {});
const tagMap = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">"
};
const errorValues = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137
};
const autocompleteValues = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4
};

function day10() {
  const invalidChars = [];
  const incompleteScores = [];

  lines.forEach((line) => {
    let expected = [];
    for (let ii = 0; ii < line.length; ii++) {
      const char = line[ii];
      const expectedTag = expected.slice(-1)[0];

      if (openTags[char]) {
        expected.push(tagMap[char]);
      } else if (char === expectedTag) {
        expected.pop();
      } else {
        invalidChars.push(char);
        break;
      }

      if (ii === line.length - 1) {
        const score = expected
          .slice()
          .reverse()
          .reduce((acc, char) => acc * 5 + autocompleteValues[char], 0);

        incompleteScores.push(score);
      }
    }
  });

  const errorScore = invalidChars.reduce((acc, tag) => {
    return (acc += errorValues[tag]);
  }, 0);

  const scores = _.sortBy(incompleteScores);
  const middle = Math.floor(scores.length / 2);

  return (
    <>
      Error score: {errorScore}
      <br />
      Autocomplete score: {scores[middle]}
    </>
  );
}

export default day10;
