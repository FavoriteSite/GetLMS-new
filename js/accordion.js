// spoller

// Если у родителя есть атрибут data-one-spoller, то выполнится это условие и работает аккардион
// если удалить этот атрибут в html будет спойллер
const spollerTitles = document.querySelectorAll('[data-spoller]');

if (spollerTitles.length > 0) {

  spollerTitles.forEach(spollerTitle => {

    // показан текст у обекта с классом _active иначе скрыт
    if (!spollerTitle.parentElement.classList.contains('_active')) {
      spollerTitle.nextElementSibling.hidden = true;
    }
    spollerTitle.addEventListener('click', function (e) {

      // проверка на атрибут для работы аккардиона
      if (this.parentElement.hasAttribute('data-one-spoller')) {

        // если у нажатой кнопки нет класса актив, то все остальные спойлеры скрыть
        if (!spollerTitle.parentElement.classList.contains('_active')) {

          // получаем активный открытый спойллер
          const titleActive = document.querySelector('[data-one-spoller]._active');

          spollerTitle.parentElement.classList.add('_active');
          slideDown(spollerTitle.nextElementSibling, 500);
          if (titleActive) {
            titleActive.classList.remove('_active');
            slideUp(titleActive.lastElementChild, 500);
          }
        }
        // закрытие активного аккардиона.Кому нужно? (4 строчки - можно удалить)
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


// скрывает объект
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

//функция показывает обект
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
    return slideDown(target, duration); //показать 
  } else {
    return slideUp(target, duration); //скрыть 
  }
}

