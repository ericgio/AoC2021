import "./styles.css";

import day1 from "./01";
import day2 from "./02";
import day3 from "./03";
import day4 from "./04";
import day5 from "./05";
import day6 from "./06";
import day7 from "./07";
import day8 from "./08";
import day9 from "./09";
import day10 from "./10";
import day11 from "./11";
import day12 from "./12";
import day13 from "./13";
import day14 from "./14";
import day15 from "./15";
import day16 from "./16";
import day17 from "./17";
import day18 from "./18";

const days = [
  day1,
  day2,
  day3,
  day4,
  day5,
  day6,
  day7,
  day8,
  day9,
  day10,
  day11,
  day12,
  day13,
  day14,
  day15,
  day16,
  day17,
  day18
];

export default function App() {
  return (
    <div>
      <h1>Advent of Code</h1>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Answers</th>
          </tr>
        </thead>
        <tbody>
          {days.map((fn, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{fn()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
