window.addEventListener("DOMContentLoaded", function () {
  // Tabs

  let tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", function (event) {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // Timer

  const deadline = "2020-05-11";

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  // Modal

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 3000);
  // Закомментировал, чтобы не отвлекало

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);

  //=============================== CLASSES

  // конструктор класса для создания карточек меню
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
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

  // создание карточек меню
  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    14,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню “Премиум”",
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    21,
    ".menu .container"
  ).render();

  //========================== FORMS

  // элемент формы
  const forms = document.querySelectorAll("form");

  // объект для хранения сообщений для пользователя
  const message = {
    loading: "img/form/spinner.svg", // спиннер
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  // добавляю каждой форме поведение
  forms.forEach((item) => {
    postData(item);
  });

  function postData(form) {
    // обработчик формы
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // элемент для показа пользователю сообщений или спиннера
      let statusMessage = document.createElement("img");
      // спиннер
      statusMessage.textContent = message.loading;
      // делаю спиннер по центру
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
      // добавляю спиннер после полей формы
      form.insertAdjacentElement("afterend", statusMessage);

      // запрос
      const request = new XMLHttpRequest();
      request.open("POST", "server.php");
      request.setRequestHeader(
        "Content-type",
        "application/json; charset=utf-8"
      );

      // объект FormData для отправки на сервер
      const formData = new FormData(form);

      // преобразование FormData в обычный объект
      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });

      // запрос к серверу
      fetch("server.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      })
        // обработка ответа от сервера
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  // функция работающая с существующим модальным окном:
  // скрывает существующий контент в модальном окне и показывает новый
  function showThanksModal(message) {
    // элемент с предыдущим контентом
    const prevModalDialog = document.querySelector(".modal__dialog");

    // скрытие предыдущего контента
    prevModalDialog.classList.add("hide");

    // отображение модального окна
    openModal();

    // создание элемента для нового контента
    const thanksModal = document.createElement("div");
    // добавление классов как у предыдущего контента
    thanksModal.classList.add("modal__dialog");
    // новый контент
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

    // добавление модальному окну элемента с новым контентом
    document.querySelector(".modal").append(thanksModal);

    // возвращение формы к прежнему состоянию и ее закрытие через 4 секунды:
    // элемент с новым контентом удаляется, а старый - будет отображаться при новом открытии формы
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }
});
