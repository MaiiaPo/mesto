/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
export default class Api {
  constructor(token, groupId) {
    this._token = token;
    this._groupId = groupId;
  }

  _response(res) {
    if (res.ok) return res.json();
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(`Ошибка ${res.status}`);
  }

  // Получение существующих карточек с сервера
  getInitialCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards`, {
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => this._response(res));
  }

  getUserData() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => this._response(res));
  }

  updateUserData(userData) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.description,
      }),
    })
      .then((res) => this._response(res));
  }

  editAvatar(link) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then((res) => this._response(res));
  }

  addCard(data) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._response(res));
  }

  removeCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._response(res));
  }

  addLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._response(res));
  }

  removeLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._response(res));
  }
}
