function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClass
) {
  //================================ TABS

  let tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

  // функция скрывает контент на странице
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }

  // функция показывает контент на странице
  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  // определение нажатого пункта меню и отображение соответствующего ему контента
  tabsParent.addEventListener("click", function (event) {
    const target = event.target;
    // tabsSelector.slice(1) - убираю точку вначале селектора
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

export default tabs;
