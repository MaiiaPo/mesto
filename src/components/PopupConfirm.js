/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(selector) {
    super(selector);
    this._form = this._popupElement.querySelector('.popup__form');
  }

  submitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}
