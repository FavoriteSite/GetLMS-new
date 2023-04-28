
// Появление меню
let nav = document.querySelector('.icon-menu');

nav.addEventListener('click', function (e) {
  let navList = document.querySelector('.header__wrap');
  navList.classList.toggle('_active');

  nav.classList.toggle('menu-open');

  let bodyElement = document.body;
  bodyElement.classList.toggle('_hidden')
});


const menuBut = document.querySelectorAll('.menu__link[data-goto]');
if (menuBut.length > 0) {
  for (let i = 0; i < menuBut.length; i++) {
    const but = menuBut[i];
    but.addEventListener('click', menuClick);
  };


  function menuClick(e) {
    const button = e.target;
    if (button.dataset.goto && document.querySelector(button.dataset.goto)) {
      const block = document.querySelector(button.dataset.goto);
      const gotoBlockValue = block.getBoundingClientRect().top + window.pageYOffset;

      let navList = document.querySelector('.header__wrap');
      navList.classList.remove('_active');

      let bodyElement = document.body;
      bodyElement.classList.remove('_hidden')

      nav.classList.remove('menu-open');

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();
    }
  }
}


//accordion

const spollerTitles = document.querySelectorAll('[data-spoller]');

if (spollerTitles.length > 0) {

  spollerTitles.forEach(spollerTitle => {

    if (!spollerTitle.parentElement.classList.contains('_active')) {
      spollerTitle.nextElementSibling.hidden = true;
    }
    spollerTitle.addEventListener('click', function (e) {

      if (this.parentElement.hasAttribute('data-one-spoller')) {

        if (!spollerTitle.parentElement.classList.contains('_active')) {

          const titleActive = document.querySelector('[data-one-spoller]._active');
          spollerTitle.parentElement.classList.add('_active');
          slideDown(spollerTitle.nextElementSibling, 500);
          if (titleActive) {
            titleActive.classList.remove('_active');
            slideUp(titleActive.lastElementChild, 500);
          }

        }
        // закрытие активного аккардиона
        else if (spollerTitle.parentElement.classList.contains('_active')) {
          spollerTitle.parentElement.classList.toggle('_active');
          slideToggle(spollerTitle.nextElementSibling, 500);
        }
      } else {
        spollerTitle.parentElement.classList.toggle('_active');
        slideToggle(spollerTitle.nextElementSibling, 500);
      }
    })
  });
}

let slideUp = (target, duration = 500) => {
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout(() => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
}

let slideDown = (target, duration = 500) => {
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;
  if (display === 'none')
    display = 'block';
  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout(() => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
}


let slideToggle = (target, duration = 500) => {
  if (window.getComputedStyle(target).display === 'none') {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
}



// Замена текста в аккардионе
const mainElement = document.documentElement;
const mainElementWidth = mainElement.clientWidth;
const butAccordion = document.querySelector('.accordion__button-text');
if (mainElementWidth <= 600) {
  butAccordion.innerHTML = 'Bыбор нескольких ответов';
}


//form
const mainForm = document.forms.main;

const focus = document.querySelectorAll('.main-form__input[data-focus]');
if (focus.length > 0) {
  for (let i = 0; i < focus.length; i++) {
    const inputNum = focus[i];
    const inputPlasceholder = inputNum.placeholder;
    inputNum.addEventListener('focus', function (e) {
      inputNum.placeholder = "";
    });
    inputNum.addEventListener('blur', function (e) {
      inputNum.placeholder = inputPlasceholder;
    });
  };
}

const inputName = mainForm.name;
const inputPhone = mainForm.phone;
const inputEmail = mainForm.email;
const inputTextarea = mainForm.comment;
let testEmail = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}/i;
let testPhone = /[0-9]/;
mainForm.addEventListener('submit', function (event) {
  event.preventDefault();
  let inputNameValue = inputName.value;
  let inputPhoneValue = inputPhone.value;
  let inputEmailValue = inputEmail.value;
  let inputTextareaValue = inputTextarea.value;

  if (inputNameValue == "" || inputNameValue.length <= 2) {
    inputName.value = "Ошибка";
    inputName.classList.add('_error');
  }
  if (!testPhone.test(inputPhoneValue) || inputPhoneValue.length <= 6) {
    inputPhone.value = "Ошибка";
    inputPhone.classList.add('_error');
  }
  if (!testEmail.test(inputEmailValue)) {
    inputEmail.value = "Ошибка";
    inputEmail.classList.add('_error');
  }
  if (inputTextareaValue == "" || inputTextareaValue.length <= 3) {
    inputTextarea.value = "Ошибка";
    inputTextarea.classList.add('_error');
  }


  const inputs = document.querySelectorAll('.main-form__input');
  if (inputs.length > 0) {
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      if (input.classList.contains("_error")) {
        input.addEventListener('click', inputUpdete)
      }
    };
  }
  function inputUpdete(e) {
    const inputItem = e.target;
    inputItem.value = "";
    inputItem.classList.remove('_error');
  }
});

