/* eslint-disable no-underscore-dangle */
export default class FormValidator {
  constructor(formElement, settings) {
    this._formElement = formElement;
    this._settings = settings;
    this.enableValidation();
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListener();
  }

  // Подписка на событие изменения данных в input
  _setEventListener() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));

    this._toggleButtonState(inputList);

    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputList);
      });
    });
  }

  // Блокирует и дизейблит кнопку отправки формы,
  // если данные в форме не валидны
  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this.disabledButton();
    } else {
      this._unDisabledButton();
    }
  }

  // Добавляет надпись ошибки под input
  _showInputError(input, errorMessage) {
    const error = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.add(this._settings.inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(this._settings.errorClass);
  }

  // Скрывает надпись ошибки под input
  _hideInputError(input) {
    const error = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.remove(this._settings.inputErrorClass);
    error.classList.add(this._settings.errorClass);
    error.textContent = '';
  }

  // Если данные в input не валидны, скрывает или показывает
  // ошибку
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  // Проверка валидности введенных данных
  // eslint-disable-next-line class-methods-use-this
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // Блокировка кнопки
  disabledButton() {
    const button = this._formElement.querySelector(this._settings.submitButtonSelector);
    button.classList.add(this._settings.inactiveButtonClass);
    // eslint-disable-next-line no-param-reassign
    button.disabled = true;
  }

  // Разблокировка кнопки
  _unDisabledButton() {
    const button = this._formElement.querySelector(this._settings.submitButtonSelector);
    button.classList.remove(this._settings.inactiveButtonClass);
    // eslint-disable-next-line no-param-reassign
    button.disabled = false;
  }

  // Очищает значения ошибок
  clearErrors() {
    const elementsForm = Array.from(this._formElement.elements);
    // Находим все input в форме
    const inputs = elementsForm.filter((el) => el.tagName.toLowerCase() === 'input' && el.getAttribute('type') !== 'submit');

    inputs.forEach((inp) => {
      if (inp.classList.contains('popup__input_type_error')) {
        // eslint-disable-next-line no-undef
        this._hideInputError(inp);
      }
    });
  }
}
