/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
export default class Popup {
  constructor(selector) {
    this._popupElement = document.querySelector(selector);
    this._save = this._popupElement.querySelector('.popup__button');
    this._handleEscClose = this._escClose.bind(this);
    this._handleMouseClose = this._mouseClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
    document.addEventListener('mousedown', this._handleMouseClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
    document.removeEventListener('mousedown', this._handleMouseClose);
  }

  _escClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _mouseClose(evt) {
    if (evt.target === this._popupElement) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.querySelector('.popup__close').addEventListener('click', () => { this.close(); });
  }

  loading(isLoading) {
    if (isLoading) {
      this._save.value = 'Сохранение...';
    } else {
      this._save.value = 'Сохранить';
    }
  }
}
