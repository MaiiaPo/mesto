/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
export default class Popup {
  constructor(selector) {
    this._popupSelector = document.querySelector(selector);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
  }

  _handleEscClose() {
    document.addEventListener('keyup', (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      }
    });
  }

  _handleMouseClose() {
    document.addEventListener('mousedown', (evt) => {
      const popupElement = document.querySelector('.popup_opened');
      if (evt.target === popupElement) {
        this.close();
      }
    });
  }

  setEventListeners() {
    this._handleEscClose();
    this._handleMouseClose();
    this._popupSelector.querySelector('.popup__close').addEventListener('click', () => { this.close(); });
  }
}
