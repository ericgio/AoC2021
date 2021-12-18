import values from "./values";

const map = "0 = 0000\n1 = 0001\n2 = 0010\n3 = 0011\n4 = 0100\n5 = 0101\n6 = 0110\n7 = 0111\n8 = 1000\n9 = 1001\nA = 1010\nB = 1011\nC = 1100\nD = 1101\nE = 1110\nF = 1111\n"
  .trim()
  .split("\n")
  .reduce((acc, m) => {
    const [key, val] = m.split(" = ");
    acc[key] = val;
    return acc;
  }, {});

function binToHex(num) {
  return parseInt(num, 2).toString(16).toUpperCase();
}

function hexToBin(hex) {
  // return parseInt(hex, 16).toString(2).padStart(4, "0");
  return hex.split("").reduce((acc, ch) => (acc += map[ch]), "");
}

function binToDec(binStr) {
  return parseInt(binStr, 2);
}

function hexToDec(hexStr) {
  return parseInt(hexStr, 16);
}

// Split a string into array of chunks of specified size
function chunk(str, size) {
  const re = new RegExp(`.{1,${size}}`, "g");
  return str.match(re) || [];
}

function parse(code) {
  const arr = chunk(code, 5);

  let codeStr = "";
  let ii = 0;
  while (ii < arr.length) {
    const chunk = arr[ii];
    codeStr += chunk.slice(1);

    // If a chunk starts with 0, stop reading.
    if (chunk[0] === "0") break;
    ii++;
  }
  return codeStr;
}

// function decodeOperator(code) {
//   const lengthTypeId = code[0];
//   const bits = lengthTypeId === "0" ? 15 : 11;
//   const start = bits + 1;
//   const length = binToDec(code.slice(1, start));

//   // `length` is the number of sub-packets
//   if (lengthTypeId === "1") {
//     return chunk(code.slice(start), 11)
//       .slice(0, length)
//       .filter((n) => !!n);
//   }

//   // `length` is the total length of the sub-packet
//   const result = code.slice(start, start + length);
//   return [result.slice(0, 11), result.slice(11)].filter((n) => !!n);
// }
function splitPacket() {}

function decodePackets(bin: string, packets) {
  // Decode the header.
  let [version, typeId] = chunk(bin, 3).map(binToHex);

  const code = bin.slice(6);

  const result = {
    version,
    typeId
  };

  if (typeId === "4") {
    packets.push({
      ...result,
      literal: binToDec(parse(code))
    });
    // return {
    //   ...result,
    //   result: parse(code),
    //   bin: code
    // };
    return packets;
  }

  const lengthTypeId = code[0];
  const bits = lengthTypeId === "0" ? 15 : 11;
  const start = bits + 1;
  const length = binToDec(code.slice(1, start));

  if (lengthTypeId === "1") {
    // `length` is the number of sub-packets
    //
    // console.log("", decodePackets(code.slice(start), packets));
    // return chunk(code.slice(start), 11)
    //   .slice(0, length)
    //   .filter((n) => !!n);
  } else {
    // `length` is the total length of the sub-packet
    // const result = code.slice(start, start + length);
    // return [result.slice(0, 11), result.slice(11)].filter((n) => !!n);
  }

  // return {
  //   ...result,
  //   packets: decodeOperator(code).map(decodePacket)
  // };

  return packets;
}

export default function day16() {
  const input = "D2FE28".trim();
  const packets = [];
  const result = decodePackets(hexToBin(input), packets);
  console.log(result);
}
