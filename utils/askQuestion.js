const readline = require("node:readline");
const process = require("process");
const clc = require("cli-color");
const createMenu = require("../assets/menu");
const storeBill = require("./storeBill");

const { stdin: input, stdout: output } = process;

class AskQuestion {
  constructor(question) {
    this.rl = readline.createInterface({ input, output });
    this.rl.question(clc.green(`${question}\n`), (ans) => {
      this.collectAns(ans);
    });
    this.selectedMenus = [];
  }

  checkMenuExist(choosedMenu) {
    let menu = createMenu();

    if (menu[choosedMenu]) {
      return true;
    }

    for (let item of menu) {
      if (item.menu === choosedMenu) {
        return true;
      }
    }

    return false;
  }

  collectAns(ans) {
    if (this.checkMenuExist(ans)) {
      if (Number(ans) / 1 === Number(ans)) {
        this.selectedMenus.push(createMenu()[ans].menu);
        console.log(clc.yellow(`${createMenu()[ans].menu} added to menu.`));
        this.askForMoreAdd();
      } else {
        this.selectedMenus.push(ans);
        console.log(clc.yellow(`${ans} added to menu.`));
        this.askForMoreAdd();
      }
    } else if (ans === "yes") {
      this.askForMenu();
    } else if (ans === "no") {
      this.createBill();
    } else {
      console.log(clc.red.bold("Please choose index or menu name"));
      this.askForMenu();
    }
  }

  askForMenu() {
    this.rl.question(clc.green("What do you like to have?\n"), (ans) => {
      this.collectAns(ans);
    });
  }

  askForMoreAdd() {
    this.rl.question(
      clc.green("Anything else sir?\n \n [yes] [no]\n"),
      (ans) => {
        this.collectAns(ans);
      }
    );
  }

  createBill() {
    const bill = {};
    let amount = 0;
    this.selectedMenus.forEach((menu) => {
      createMenu().forEach((item) => {
        if (menu === item.menu) {
          amount += item.price;
        }
      });
    });

    this.rl.question(clc.green("Enter your name\n"), (ans) => {
      bill[ans] = {
        items: this.selectedMenus.join("|"),
        amount,
      };
      console.table(bill);
      storeBill(ans, bill);
      this.rl.close();
    });
  }
}

module.exports = AskQuestion;
