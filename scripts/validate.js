const settingsValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

function showInputError(form, input, errorMessage) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(settingsValidation.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(settingsValidation.errorClass);
}

function hideInputError(form, input) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(settingsValidation.inputErrorClass);
  error.classList.add(settingsValidation.errorClass);
  error.textContent = '';
}

function checkInputValidity(form, input) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settingsValidation.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(settingsValidation.inactiveButtonClass);
  }
}

function setEventListener(form) {
  const inputList = Array.from(form.querySelectorAll(settingsValidation.inputSelector));
  const button = form.querySelector(settingsValidation.submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, button);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, button);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(settingsValidation.formSelector));

  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListener(form);
  });
}

enableValidation();
