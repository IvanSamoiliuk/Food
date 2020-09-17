function timer(timerId, deadline) {
  //================================= TIMER

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

  setClock(timerId, deadline);
}

export default timer;
