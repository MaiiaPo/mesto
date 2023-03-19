/* eslint-disable import/extensions */
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  // eslint-disable-next-line no-useless-constructor
  constructor(selector) {
    super(selector);
  }

  open(name, link) {
    const captionPopupFullScreen = document.querySelector('.full__caption');
    const imgPopupFullScreen = document.querySelector('.full__image');

    captionPopupFullScreen.textContent = name;
    imgPopupFullScreen.src = link;
    imgPopupFullScreen.alt = name;

    super.open();
  }
}
