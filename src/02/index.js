import values from "./values";

export default function day2() {
  const { aim, depth, distance } = values.reduce(
    (acc, value) => {
      const [direction, amount] = value.split(" ");

      switch (direction.toLowerCase()) {
        case "forward":
          acc.distance += +amount;
          acc.depth += acc.aim * +amount;
          break;
        case "up":
          // acc.depth -= +amount;
          acc.aim -= +amount;
          break;
        case "down":
          // acc.depth += +amount;
          acc.aim += +amount;
          break;
        default:
      }

      return acc;
    },
    {
      aim: 0,
      distance: 0,
      depth: 0
    }
  );

  return (
    <>
      Distance: {distance}
      <br />
      Depth: {depth}
      <br />
      Aim: {aim}
      <br />
      Depth x Distance = {depth * distance}
    </>
  );
}
