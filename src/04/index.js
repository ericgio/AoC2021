import { numbers, boards } from "./values";

function isWinner(board, draw) {
  // Rotate board so that all the cols become columns
  const boardRotated = board.reduce(
    (acc, row) => {
      row.forEach((num, idx) => {
        acc[idx].push(num);
      });
      return acc;
    },
    [[], [], [], [], []]
  );

  const numberIsMarked = (num) => draw.includes(num);
  const isRowComplete = (row) => row.every(numberIsMarked);

  return [...board, ...boardRotated].some(isRowComplete);
}

function getScore(board, draw) {
  let collapsed = [];
  board.forEach((row) => {
    collapsed = [...collapsed, ...row];
  });

  return collapsed
    .filter((num) => !draw.includes(num))
    .reduce((acc, num) => acc + num, 0);
}

function getWinningOrder() {
  let ii;
  let draw;
  let winners = [];

  for (ii = 5; ii < numbers.length; ii++) {
    draw = numbers.slice(0, ii);

    boards.forEach((board, idx) => {
      // Don't add winning board again.
      if (winners.find(({ index }) => index === idx)) {
        return;
      }

      if (isWinner(board, draw)) {
        winners.push({
          index: idx,
          score: getScore(board, draw),
          number: draw.slice(-1)[0]
        });
      }
    });

    // Once the final board has won, stop
    if (winners.length === boards.length) {
      break;
    }
  }

  return winners;
}

export default function day4() {
  const order = getWinningOrder();
  const winner = order[0];
  const loser = order.slice(-1)[0];

  return (
    <>
      Winner: Board {+winner.index + 1}
      <br />
      Winning number: {winner.number}
      <br />
      Winning board score: {winner.score}
      <br />
      Winning final score: {winner.score * winner.number}
      <br />
      --------------------------
      <br />
      Loser: Board {+loser.index + 1}
      <br />
      Losing number: {loser.number}
      <br />
      Losing board score: {loser.score}
      <br />
      Losing final score: {loser.score * loser.number}
    </>
  );
}
