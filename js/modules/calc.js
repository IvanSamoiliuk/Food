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

export default calc;
