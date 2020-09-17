// функция скрытия модального окна
function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("hide");
  modal.classList.remove("show");
  // либо вариант с toggle - но тогда назначить класс в верстке

  // восстановление значения overflow по умолчанию
  document.body.style.overflow = "";
}

// функция отображения модального окна
function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("show");
  modal.classList.remove("hide");
  // либо вариант с toggle - но тогда назначить класс в верстке

  // блокировка скролла страницы при открытом модальном окне
  document.body.style.overflow = "hidden";

  // если таймер передан и существует
  // убрать открытиe модалки через заданное время,
  // если пользователь уже самостоятельно открыл модальное окно
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  //================================= MODAL

  // кнопка открытия окна
  const modalTrigger = document.querySelectorAll(triggerSelector);
  // модальное окно
  const modal = document.querySelector(modalSelector);

  console.log(modalTrigger);

  // для каждой кнопки добавляем обработчик открытия окна
  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", () => openModal(modalSelector, modalTimerId));
  });

  // добавление элементу окна обработчика закрытия окна,
  // если пользователь нажал на пространство вне окна или на крестик
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });

  // добавление элементу документа обработчика закрытия окна,
  // если пользователь нажал клавишу ESC
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });

  // функция отображающая модальное окно при прокрутке в самый низ страницы
  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  // обработчик, отображающий модалку при скроллинге
  window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export { closeModal };
export { openModal };
