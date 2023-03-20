/* eslint-disable no-underscore-dangle */
export default class FormValidator {
  constructor(formElement, settings) {
    this._formElement = formElement;
    this._settings = settings;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._button = this._formElement.querySelector(this._settings.submitButtonSelector);
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
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  // Блокирует и дизейблит кнопку отправки формы,
  // если данные в форме не валидны
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
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
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // Блокировка кнопки
  disabledButton() {
    this._button.classList.add(this._settings.inactiveButtonClass);
    // eslint-disable-next-line no-param-reassign
    this._button.disabled = true;
  }

  // Разблокировка кнопки
  _unDisabledButton() {
    this._button.classList.remove(this._settings.inactiveButtonClass);
    // eslint-disable-next-line no-param-reassign
    this._button.disabled = false;
  }

  // Очищает значения ошибок
  clearErrors() {
    this._inputList.forEach((input) => {
      if (input.classList.contains('popup__input_type_error')) {
        // eslint-disable-next-line no-undef
        this._hideInputError(input);
      }
    });
  }
}
