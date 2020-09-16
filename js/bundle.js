/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc() {
  //========================= CALCULATOR

  // элемент с вычисленными данными
  const result = document.querySelector(".calculating__result span");

  // значения по умолчанию для кнопок, выбранных по умолчанию
  let sex = "female";
  let ratio = 1.375;
  let height;
  let weight;
  let age;

  // если в LS уже есть сохраненные данные, то беру данные оттуда,
  // если их там нет, то уст-ю знач по умолчанию и сохраняю в LS
  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "female";
    localStorage.setItem("sex", "female");
  }
  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = 1.375;
    localStorage.setItem("ratio", 1.375);
  }

  // функция, вычисляющая результат на данных формы (статических и динамических)
  function calcTotal() {
    // проверка, что есть все данные
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "____";
      return;
    }
    // вычисление данных (формулы для М и Ж отличаются)
    // и запись в результирующее поле
    if (sex === "female") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }
  // вызов функции расчета, чтобы изменить то, что в верстке на '_____'
  calcTotal();

  // функция, уст класс активности выбранным кнопкам на основе данных в LS
  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute("id") === localStorage.getItem("sex")) {
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        elem.classList.add(activeClass);
      }
    });
  }

  // устаналиваю подсветку выбранного набора кнопок-значений
  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  // функция для получения статических с нажатых кнопок (информация в них уже забита)
  function getStaticInformation(selector, activeClass) {
    // получаем все кнопки на основе родителя
    const elements = document.querySelectorAll(`${selector}`);

    // обработчик: если есть атрибут 'data-ratio' (есть только у физ активности),
    // значит, это элементы из этой группы;
    // если нет атрибута, значит это группа выбора половой принадлежности
    elements.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          // запись данных в LS
          localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
        } else {
          sex = e.target.getAttribute("id");
          // запись данных в LS
          localStorage.setItem("sex", e.target.getAttribute("id"));
        }

        // добавляю класс активности (подсветка нажатой кнопки)
        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);

        // вызов расчетной функции для автообновления результата при смене кнопки
        calcTotal();
      });
    });
  }

  // для дефолтной подсветки
  getStaticInformation("#gender div", "calculating__choose-item_active");
  getStaticInformation(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  // функция для получения динамических данных из полей формы
  function getDynamicInformation(selector) {
    // элемент инпута
    const input = document.querySelector(selector);

    // обработчик выбранного инпута на основе id
    input.addEventListener("input", () => {
      // проверка введ данных на присутствие 'не чисел' и подсветка этих полей
      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }
      switch (input.getAttribute("id")) {
        // присваиваем переменным для расчета значение из поля ввода
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }

      // пересчет данных после ввода
      calcTotal();
    });
  }

  // запуск работы функций
  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");
}

module.exports = calc;


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

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


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function forms() {
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
}

module.exports = forms;


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal() {
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
}

module.exports = modal;


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider() {
  //=============================== SLIDER

  // индекс текущего слайда
  let slideIndex = 1;
  //
  let offset = 0;

  // главная обертка-слайдер
  const slider = document.querySelector(".offer__slider");
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

  // выставляю свойство position в значение relative,
  // чтобы во внутренних элементах правильно работало position: absolute
  slider.style.position = "relative";

  // блок для индикаторов страниц (точек)
  const indicators = document.createElement("ol");
  // массив элементов-точек для удобной работы
  const dots = [];
  // добавляю стили на месте (если вдруг нет доступа к файлу CSS)
  indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
  // добавляю индикаторы элементу-слайдеру
  slider.append(indicators);

  // для каждого слайда создаю индикатор-точку с соотв стилями
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;
    // для первого слайда индикатор делаю более насыщенным
    if (i == 0) {
      dot.style.opacity = 1;
    }
    // добавляю элемент-точку в родительский блок
    indicators.append(dot);
    // добавляю элемент-точку в массив
    dots.push(dot);
  }

  // функция для удаления текстовых фрагментов в размерах (5px, 10em,... )
  function deleteNotDigits(str) {
    return +str.replace(/\D/g, "");
  }

  next.addEventListener("click", () => {
    // (1) если сдвиг максимальный (последний слайд), то обнуляю значение сдвига (слайд 1)
    // (2) +width.slice(0, width.length - 2) - это числ значение без ед изм (px)
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      // если нет, то прибавляю еще одну ширину окна у сдвигу (offset)
      offset += deleteNotDigits(width);
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

    selecDot();
  });

  prev.addEventListener("click", () => {
    // если слайд первый, то пререключаю на последний слайд
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      // если нет, то отнимаю одну ширину окна от сдвига
      offset -= deleteNotDigits(width);
    }

    // сдвиг поля влево на значение переменной offset
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    addZero();

    selecDot();
  });

  // функция, добавляющая ноль перед номером слайда, если он меньше 10
  function addZero() {
    if (slideIndex < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  // функция, которая выделяет выбранный слайд
  function selecDot() {
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  }

  // --- функционал переключения на нужный слайд по клику на точку
  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      // определяю, что выбран именно элемент-точка
      const slideTo = e.target.getAttribute("data-slide-to");

      // меняю индекс слайда на выбранный с помощью клика на точку
      slideIndex = slideTo;
      // меняю сдвиг на нужный до выбранного слайда
      offset = deleteNotDigits(width) * (slideTo - 1);
      // сдвигаю поле к нужному слайду
      slidesField.style.transform = `translateX(-${offset}px)`;

      addZero();

      selecDot();
    });
  });
}

module.exports = slider;


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs() {
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
}

module.exports = tabs;


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {
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
}

module.exports = timer;


/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener("DOMContentLoaded", function () {
  const calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
  const cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
  const forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
  const modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
  const slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
  const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
  const timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

  calc();
  cards();
  forms();
  modal();
  slider();
  tabs();
  timer();
});


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map