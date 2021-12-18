import _ from "lodash";
import values from "./values";

function strToInt(str) {
  switch (str.length) {
    case 2:
      return 1;
    case 4:
      return 4;
    case 3:
      return 7;
    case 7:
      return 8;
    default:
      return null;
  }
}

function isUnique(d) {
  return !!strToInt(d);
}

// function getUniqueOutputDigits(arr) {
//   let unique = 0;
//   arr.forEach(([_, output]) => {
//     output.split(" ").forEach((digit) => {
//       if (isUnique(digit)) {
//         unique += 1;
//       }
//     });
//   });
//   return unique;
// }

function sortStr(str) {
  return str.split("").sort().join("");
}

// Checks if str1 contains every char in str2
function contains(str1, str2) {
  return str2.split("").every((ch) => str1.includes(ch));
}

/**
 * create  map for each row, mapping string to number
 * Algorithm to deduce numbers:
 *  - Unique numbers: 1, 4, 7, 8
 *  - str.length === 6 && !contains(1) => 6
 *  - str.length === 6 && contains(4) => 9
 *  - str.length === 6 => 0
 *  - str.length === 5 && contains(7) => 0
 */
function getIntMap(input) {
  const row = _.sortBy(input.split(" "), [
    isUnique,
    (str) => str.length === 6
  ]).reverse();

  const toInt = {};
  const toStr = {};

  function updateMaps(str, int) {
    toInt[str] = int;
    toStr[int] = str;
  }

  row.forEach((str) => {
    str = sortStr(str);

    let int = strToInt(str);
    if (str.length === 6) {
      if (!contains(str, toStr[1])) {
        int = 6;
      } else if (contains(str, toStr[4])) {
        int = 9;
      } else {
        int = 0;
      }
    } else if (str.length === 5) {
      if (contains(str, toStr[1])) {
        int = 3;
      } else if (contains(toStr[9], str)) {
        int = 5;
      } else {
        int = 2;
      }
    }
    updateMaps(str, int);
  });

  return toInt;
}

function day8() {
  const sum = values.reduce(
    (acc, [input, output]) =>
      (acc += +output
        .split(" ")
        .map((str) => getIntMap(input)[sortStr(str)])
        .join("")),
    0
  );

  return (
    <>
      {/* Unique output digit count: {getUniqueOutputDigits(values)} */}
      Output sum: {sum}
    </>
  );
}

export default day8;
