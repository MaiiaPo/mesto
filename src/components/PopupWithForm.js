/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const formValues = {};

    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
