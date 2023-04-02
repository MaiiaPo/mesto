/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
export default class Card {
  constructor(
    card,
    template,
    userId,
    handleCardClick,
    handleCardDelete,
    handleSetLike,
    handleDeleteLike,
  ) {
    this._card = card;
    this.name = card.name;
    this.link = card.link;
    this._userId = userId;
    this.cardId = card._id;
    this.owner = card.owner;
    this._likes = card.likes;
    this.template = template;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleSetLike = handleSetLike;
    this._handleDeleteLike = handleDeleteLike;
    this._cardElement = this._getTemplate();
    this._likeElement = this._cardElement.querySelector('.element__like');
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

    this._visibleDelete();

    img.src = this.link;
    img.alt = this.name;
    title.textContent = this.name;
    this._setLikes();

    this._setEventListeners();

    return this._cardElement;
  }

  /**
   * Устанавливает видимость для иконки удаления.
   * Удалять карточки может только владелец.
   */
  _visibleDelete() {
    const deleteIcon = this._cardElement.querySelector('.element__delete');
    if (this.owner._id !== this._userId) {
      deleteIcon.style.display = 'none';
    }
  }

  _setLikes() {
    if (this._hasMyLike()) {
      this._likeElement.classList.add('element__like_active');
    } else {
      this._likeElement.classList.remove('element__like_active');
    }
    this._cardElement.querySelector('.element__count').textContent = this._likes.length;
  }

  handleRemoveCard() {
    this._cardElement.remove();
  }

  _handleOpenFullScreen() {
    this._cardElement.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this.name, this.link);
    });
  }

  _handleDeleteCard() {
    this._cardElement.querySelector('.element__delete').addEventListener('click', () => {
      this._handleCardDelete(this);
    });
  }

  _setEventListeners() {
    this._likeElement.addEventListener('click', () => {
      if (!this._hasMyLike()) {
        this._handleSetLike(this);
      } else {
        this._handleDeleteLike(this);
      }
    });
    this._handleOpenFullScreen();
    this._handleDeleteCard();
  }

  updateLikes(data) {
    this._likes = data.likes;
    this._setLikes();
  }

  _hasMyLike() {
    if (this._likes.some((like) => like._id === this._userId)) return true;
    return false;
  }
}
