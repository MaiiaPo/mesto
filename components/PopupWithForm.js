/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector) {
    super(selector);
  }

  _getInputValues() {

  }

  setEventListeners() {
    super.setEventListeners();
  }

  close() {
    super.close();
  }
}
