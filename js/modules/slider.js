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
