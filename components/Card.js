/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
export default class Card {
  constructor(card, template, handleOpenImage) {
    this.name = card.name;
    this.link = card.link;
    this.template = template;
    //this._handleOpenImage = handleOpenImage;
    this._cardElement = this._getTemplate();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this.template)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    const img = this._cardElement.querySelector('.element__image');
    const title = this._cardElement.querySelector('.element__title');

    img.src = this.link;
    img.alt = this.name;
    title.textContent = this.name;

    this._setEventListeners();

    return this._cardElement;
  }

  _handleLike(evt) {
    evt.target.classList.toggle('element__like_active');
  }

  _handleRemoveCard() {
    this._cardElement.remove();
  }

  _handleOpenFullScreen() {
    this._cardElement.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenImage(this.name, this.link);
    });
  }

  _setEventListeners() {
    this._cardElement.querySelector('.element__like').addEventListener('click', this._handleLike);
    this._cardElement.querySelector('.element__delete').addEventListener('click', () => {
      this._handleRemoveCard();
    });
    //this._handleOpenFullScreen();
  }
}
