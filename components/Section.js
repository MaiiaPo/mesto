import Card from './Card.js';
/* eslint-disable no-underscore-dangle */
export default class Section {
  constructor({ data }, method, selector, handleOpenImage) {
    this._items = data;
    this._container = document.querySelector(selector);
    this._method = method;
    this._handleOpenImage = handleOpenImage;
  }

  renderItems() {
    this._items.forEach((item) => {
      const card = new Card(item, '#element', this._handleOpenImage);
      const newCard = card.createCard();

      this._setItem(newCard);
    });
  }

  _setItem(element) {
    if (this._method === 'append') {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}
