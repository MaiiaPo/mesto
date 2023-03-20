/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  // eslint-disable-next-line no-useless-constructor
  constructor(selector) {
    super(selector);
    this._captionPopupFullScreen = this._popupElement.querySelector('.full__caption');
    this._imgPopupFullScreen = this._popupElement.querySelector('.full__image');
  }

  open(name, link) {
    this._captionPopupFullScreen.textContent = name;
    this._imgPopupFullScreen.src = link;
    this._imgPopupFullScreen.alt = name;

    super.open();
  }
}
