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
      seconds = timer.querySelector("#seconds");

    // время обновляется каждую секунду
    const timeInterval = setInterval(updateClock, 1000);

    updateClock();

    // функция присваивает элементу значение времени
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
  // элемент, закрывающий модальное окно (крестик)
  const modalCloseBtn = document.querySelector("[data-close]");

  // для каждой кнопки добавляем обработчика открытия окна
  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", function () {
      modal.classList.add("show");
      modal.classList.remove("hide");
      // Либо вариант с toggle - но тогда назначить класс в верстке

      // Блокировка скролла страницы при открытом модальном окне.
      document.body.style.overflow = "hidden";
    });
  });

  // функция скрытия модального окна
  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    // Либо вариант с toggle - но тогда назначить класс в верстке

    // Восстановление значения overflow по умолчанию
    document.body.style.overflow = "";
  }

  // добавление крестику обработчика закрытия окна
  modalCloseBtn.addEventListener("click", closeModal);

  // добавление элементу окна обработчика закрытия окна,
  // если пользователь нажал на пространство вне окна
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
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
});
