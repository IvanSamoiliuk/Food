window.addEventListener("DOMContentLoaded", function () {
  //================================ TABS

  let tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  // функция скрывает контент на странице
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  // функция показывает контент на странице
  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  // определение нажатого пункта меню и отображение соответствующего ему контента
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

  //================================= TIMER

  // дата завершения таймера
  const deadline = "2020-05-11";

  // функция определяет количество оставшегося времени
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

  // функция добавляет ноль перед однозначным числом
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  // основная функция, отвечающая за обновление времени
  function setClock(selector, endtime) {
    // получаем элементы, отвечающие за значения таймера
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      // время обновляется каждую секунду
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    // функция присваивает элементу текущее значение времени
    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      // если время закончилось, очищается интервал обновления времени
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  //================================= MODAL

  // кнопка открытия окна
  const modalTrigger = document.querySelectorAll("[data-modal]");
  // модальное окно
  const modal = document.querySelector(".modal");

  // для каждой кнопки добавляем обработчик открытия окна
  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  // функция скрытия модального окна
  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    // либо вариант с toggle - но тогда назначить класс в верстке

    // восстановление значения overflow по умолчанию
    document.body.style.overflow = "";
  }

  // функция отображения модального окна
  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    // либо вариант с toggle - но тогда назначить класс в верстке

    // блокировка скролла страницы при открытом модальном окне
    document.body.style.overflow = "hidden";

    // убрать открытиe модалки через заданное время,
    // если пользователь уже самостоятельно открыл модальное окно
    clearInterval(modalTimerId);
  }

  // добавление элементу окна обработчика закрытия окна,
  // если пользователь нажал на пространство вне окна или на крестик
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  // добавление элементу документа обработчика закрытия окна,
  // если пользователь нажал клавишу ESC
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  // через 30 секунд после открытия автоматически отобразится модальное окно
  const modalTimerId = setTimeout(openModal, 30000);

  // функция отображающая модальное окно при прокрутке в самый низ страницы
  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  // обработчик, отображающий модалку при скроллинге
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
    bindPostData(item);
  });

  // отправка данных на сервер
  const postData = async (url, data) => {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    return await res.json();
  };

  // получение данных с сервера
  async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  function bindPostData(form) {
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

      // объект FormData для отправки на сервер
      const formData = new FormData(form);

      // альтернативное преобразование FormData в JSON
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      // запрос к серверу и обработка ответа
      postData("http://localhost:3000/requests", json)
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

  //=============================== SLIDER

  // индекс текущего слайда
  let slideIndex = 1;
  //
  let offset = 0;

  // все изображения для слайдов
  const slides = document.querySelectorAll(".offer__slide");
  // стрелочка <-
  const prev = document.querySelector(".offer__slider-prev");
  // стрелочка ->
  const next = document.querySelector(".offer__slider-next");
  // элемент, отвечающий за общее количество слайдов
  const total = document.querySelector("#total");
  // элемент, отвечающий за номер текущего слайда
  const current = document.querySelector("#current");
  // обертка-окно для слайдера
  const slidesWrapper = document.querySelector(".offer__slider-wrapper");
  // ширина обертки-окна слайдера
  const width = window.getComputedStyle(slidesWrapper).width;
  // поле, содержащее все слайды
  const slidesField = document.querySelector(".offer__slider-inner");

  // добавляю перед общим количеством слайдов (если меньше 10) и текущим слайдом ноль
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = `0${slideIndex}`;
  }

  // всë, в дочерних элементах, что не помещается в ширину обертки-окна,
  // становится невидимым
  slidesWrapper.style.overflow = "hidden";

  // ширина равна ширине всех вместе взятых слайдов
  slidesField.style.width = 100 * slides.length + "%";
  // все слайды выстраиваю в горизонтальную линию
  slidesField.style.display = "flex";
  // анимация сдвигает поле со всеми слайдами
  slidesField.style.transition = "0.5s all";

  // задаем всем слайдам одинаковую ширину
  slides.forEach((slide) => {
    slide.style.width = width;
  });

  next.addEventListener("click", () => {
    // (1) если сдвиг максимальный (последний слайд), то обнуляю значение сдвига (слайд 1)
    // (2) +width.slice(0, width.length - 2) - это числ значение без ед изм (px)
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      // если нет, то прибавляю еще одну ширину окна у сдвигу (offset)
      offset += +width.slice(0, width.length - 2);
    }

    // сдвиг поля влево на значение переменной offset
    slidesField.style.transform = `translateX(-${offset}px)`;

    // --- для переключения счетчика на странице
    // если индекс равен количеству слайдов, переприсваиваю значение индекса = 1
    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    addZero();
  });

  prev.addEventListener("click", () => {
    // если слайд первый, то пререключаю на последний слайд
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      // если нет, то отнимаю одну ширину окна от сдвига
      offset -= +width.slice(0, width.length - 2);
    }

    // сдвиг поля влево на значение переменной offset
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    addZero();
  });

  // функция, добавляющая ноль перед номером слайда, если он меньше 10
  function addZero() {
    if (slideIndex < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }
});
