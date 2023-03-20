/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popupElement.querySelector('.popup__form');
  }

  getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    const formValues = {};

    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
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
