let menuMobile = document.querySelector('.header__wrap-mobile');  // блок, который показывается на мобильных устройствах
let bodyElement = document.body;  // body
let linkAriaLabel = document.querySelectorAll('[data-label]'); // все элементы, которые нужно скрыть на моб уст(ссылки, кнопки data-label="hidden" )
let buttonBurger = document.querySelector('.icon-menu'); //копка бургер
let buttonBurgerStyle = getComputedStyle(buttonBurger);  //стили кнопки бургер
let buttonBurgerStyleDisplay = buttonBurgerStyle.display;  //значение сво-ва display
const menuLinks = document.querySelectorAll('.header__link[data-goto]'); //ссылки для перехода к разделам сайта data-goto=".opportunities"
if (menuLinks) {
  for (let menuLink of menuLinks) {
    menuLink.addEventListener('click', menuLinkGoTo);
  };
}

//если бургер имеет сво-во display (есть на сайте)
if (buttonBurgerStyleDisplay == 'block') {
  addAriaHidden();
}

//удаляем фокус и nvda, когда моб меню скрыто, но по размеру уже есть на сайте
function addAriaHidden() {
  for (let item of linkAriaLabel) {
    item.setAttribute('aria-hidden', 'true');
    item.setAttribute('tabindex', '-1');
  }
}

//добавляем фокус и nvda
function removeAriaHidden() {
  for (const item of linkAriaLabel) {
    item.removeAttribute('aria-hidden');
    item.removeAttribute('tabindex');
  }
}

//принимает menuMobile,  в котором ходим бесконечно по элементам, когда бургер открыт
function trapFocus(element) {
  let focusableEls = menuMobile.querySelectorAll('a[href]:not([disabled]), button:not([disabled])');
  let firstFocusableEl = focusableEls[0];
  let lastFocusableEl = focusableEls[focusableEls.length - 1];
  const KEYCODE_TAB = 9;

  menuMobile.addEventListener('keydown', function (e) {
    let isTabPressed = (e.key === 'Tab' || e.code === KEYCODE_TAB);


    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) /* shift + tab */ {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } else/* tab */ {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  });
}


//клик на бургер
buttonBurger.addEventListener('click', function (e) {
  menuMobile.classList.toggle('_show-menu'); //появление меню
  buttonBurger.classList.toggle('menu-open'); //смена в кнопке полос на крест
  bodyElement.classList.toggle('_hidden'); //блокировка скрола на все сайте

  trapFocus(menuMobile); //ф-я бесконечного хождения по ссылкам попапа
  removeAriaHidden(); //вернуть focuc и nvda при открытом мобильном меню
  if (!buttonBurger.classList.contains('menu-open')) {
    closeMenu(); //закрытие меню
  }

});


function menuLinkGoTo(e) {
  const linkActive = e.target; //ссылка, на которую нажали
  if (linkActive.dataset.goto && document.querySelector(linkActive.dataset.goto)) { //есть ли атрибут && есть, то на что ссылается
    const blockActive = document.querySelector(linkActive.dataset.goto); //блок, на который ссылается нажатая ссылка
    const blockActiveValue = blockActive.getBoundingClientRect().top + window.pageYOffset; //высота блока

    //если моб версия, то закрываем меню
    if (menuMobile.classList.contains('_show-menu')) {
      closeMenu(); //закрытие меню
    }


    //плавно перешли к актиному блоку
    window.scrollTo({
      top: blockActiveValue,
      behavior: "smooth"
    });

    //задержка для плавного перехода, а затем фокусировки
    // setTimeout(activeFocusInActiveBlock, 1000, blockActive);
    activeFocusInActiveBlock(blockActive);


    e.preventDefault();
  }
}


function activeFocusInActiveBlock(blockActive) {
  //в блоке, на который нужно перейти получает все возможные теги
  let activeElements = blockActive.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
  //получаем все возможные теги на всем сайте
  let activeElementsDocument = document.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
  let firstElementActiveBlock = activeElements[0];   //в активном блоке получаем первый элемент для фокуса


  let counter = 0; //счетчик
  for (let i of activeElementsDocument) {

    if (i == firstElementActiveBlock) { //если один из элементов на сайте равен первому элементу в актвном блоке 
      activeElementsDocument[counter - 1].focus({ preventScroll: true }); //делаем фокус предыдущему элементу по счетчику
      break; //заканчиваем перебирать цикл
    }

    counter += 1; //счетчик после условия
  }
}

//закрытие по esc
document.addEventListener('keydown', function (e) {
  if (e.which === 27 && menuMobile.classList.contains('_show-menu')) {
    closeMenu(); //закрытие меню
  }
});


//закрытие меню
function closeMenu() {
  menuMobile.classList.remove('_show-menu'); //меню исчезает
  bodyElement.classList.remove('_hidden') //разблокировка body
  buttonBurger.classList.remove('menu-open');//смена в кнопке обратно на линии
  addAriaHidden(); //прячем опять фокус и nvda
}