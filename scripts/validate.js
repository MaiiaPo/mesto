// Добавляет надпись ошибки под input
function showInputError(form, input, errorMessage, data) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(data.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(data.errorClass);
}

// Скрывает надпись ошибки под input
function hideInputError(form, input, data) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(data.inputErrorClass);
  error.classList.add(data.errorClass);
  error.textContent = '';
}

// Если данные в input не валидны, скрывает или показывает
// ошибку
function checkInputValidity(form, input, data) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, data);
  } else {
    hideInputError(form, input, data);
  }
}

// Проверка валидности введенных данных
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

// Блокирует и дизейблит кнопку отправки формы,
// если данные в форме не валидны
function toggleButtonState(inputList, button, data) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(data.inactiveButtonClass);
  } else {
    button.classList.remove(data.inactiveButtonClass);
  }
}

// Подписка на событие изменения данных в input
function setEventListener(form, data) {
  const inputList = Array.from(form.querySelectorAll(data.inputSelector));
  const button = form.querySelector(data.submitButtonSelector);

  toggleButtonState(inputList, button, data);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, data);
      toggleButtonState(inputList, button, data);
    });
  });
}

function enableValidation(data) {
  const formList = Array.from(document.querySelectorAll(data.formSelector));

  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListener(form, data);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});
