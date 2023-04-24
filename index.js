const clc = require("cli-color");
const AskQuestion = require("./utils/askQuestion");
const createMenu = require("./assets/menu");

console.log(clc.bgCyan.underline.black("-----Welcome to Decaprio Cafe------"));
console.table(createMenu());
const askQuestion = new AskQuestion("What do you like to have?");
