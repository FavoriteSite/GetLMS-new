
//form
const mainForm = document.forms.main;

const focus = document.querySelectorAll('.form__input[data-focus]');
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

  const inputs = document.querySelectorAll('[data-focus]');
  if (inputs.length > 0) {
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      if (input.classList.contains("_error")) {
        input.addEventListener('click', inputUpdeteClick);
        input.addEventListener('keyup', inputUpdeteKeyup);
      }
    };
  }


  function inputUpdeteClick(e) {
    const inputItem = e.target;
    inputItem.classList.remove('_error');
    if (inputItem.value == "Ошибка") {
      inputItem.value = "";
    }
  }

  function inputUpdeteKeyup(e) {
    const inputItem = e.target;
    if (e.which == 9 || e.shiftKey) {
      inputItem.classList.remove('_error');
      if (inputItem.value == "Ошибка") {
        inputItem.value = "";
      }
    }
  }
});
