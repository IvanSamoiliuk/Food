function cards() {
  //====================== CARDS

  // конструктор класса для создания карточек меню
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
      this.transfer = 27;
      this.changeToUAH();
    }

    // функция, конвертирующая долларовую цену в гривны
    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    // функция отображения карточки меню на странице
    render() {
      const element = document.createElement("div");

      // если массив classes пустой или в нем нет класса по умолчанию ("menu__item"),
      // то добавляю этот класс в массив classes
      if (!this.classes.includes("menu__item")) {
        this.classes.push("menu__item");
      }

      // добавляю элементу каждый класс из массива classes
      this.classes.forEach((className) => element.classList.add(className));

      // верстка карточки скопирована из index.html
      element.innerHTML = `
              <img src=${this.src} alt=${this.alt}>
              <h3 class="menu__item-subtitle">${this.title}</h3>
              <div class="menu__item-descr">${this.descr}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
              </div>
          `;
      this.parent.append(element);
    }
  }

  // загрузка и отрисовка карточек меню с сервера
  // getResource("http://localhost:3000/menu").then((data) => {
  //   data.forEach(({ img, altimg, title, descr, price, parentSelector }) => {
  //     new MenuCard(img, altimg, title, descr, price, parentSelector).render();
  //   });
  // });

  axios.get("http://localhost:3000/menu").then((data) => {
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });
}

module.exports = cards;
