const fs = require("fs");
const clc = require("cli-color");

const storeBill = (name, bill) => {
  const filename = `${name}_${Date.now()}`;
  fs.writeFile(
    `${__dirname}/../bills/${filename}.json`,
    JSON.stringify(bill),
    (err) => {
      if (!err) {
        console.log(clc.bgGreen.white("Bill saved"));
      } else {
        console.log(clc.red(`Error: ${err}`));
      }
    }
  );
};

module.exports = storeBill;
