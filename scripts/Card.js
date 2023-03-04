/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
export default class Card {
  constructor(card, template) {
    this.name = card.name;
    this.link = card.link;
    this.template = template;
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
    const cardElement = this._getTemplate();

    const img = cardElement.querySelector('.element__image');
    const title = cardElement.querySelector('.element__title');

    img.src = this.link;
    img.alt = this.name;
    title.textContent = this.name;

    this._setEventListeners(cardElement);

    return cardElement;
  }

  _handleLike(evt) {
    evt.target.classList.toggle('element__like_active');
  }

  _handleRemoveCard(cardElement) {
    cardElement.remove();
  }

  _handleOpenFullScreen() {
    const fullCaption = document.querySelector('.full__caption');
    const fullImg = document.querySelector('.full__image');
    const fullImgPopup = document.querySelector('.popup_image');

    fullCaption.textContent = this.name;
    fullImg.src = this.link;
    fullImg.alt = this.name;

    fullImgPopup.classList.add('popup_opened');
  }

  _setEventListeners(cardElement) {
    cardElement.querySelector('.element__like').addEventListener('click', this._handleLike);
    cardElement.querySelector('.element__delete').addEventListener('click', () => {
      this._handleRemoveCard(cardElement);
    });
  }
}
