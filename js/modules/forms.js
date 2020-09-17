import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
  //========================== FORMS

  // элемент формы
  const forms = document.querySelectorAll(formSelector);

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
    openModal(".modal", modalTimerId);

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
      closeModal(".modal");
    }, 4000);
  }
}

export default forms;
