/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popupSelector.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._handleSubmitForm);
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}