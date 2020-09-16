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
