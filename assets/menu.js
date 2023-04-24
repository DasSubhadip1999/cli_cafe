class Menu {
  constructor(menu, price) {
    this.menu = menu;
    this.price = price; //₹

    return this;
  }
}

const createMenu = () => {
  const coffee = new Menu("Black Coffee", 150);
  const tea = new Menu("Tea", 130);
  const coldCoffee = new Menu("Cold Coffee", 350);
  return [coffee, tea, coldCoffee];
};

module.exports = createMenu;
