/* eslint-disable no-underscore-dangle */
export default class Api {
  constructor(token, groupId) {
    this._token = token;
    this._groupId = groupId;
  }

  // Получение существующих карточек с сервера
  getInitialCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards`, {
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject(`Ошибка ${res.status}`);
      });
  }

  getUserData() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject(`Ошибка ${res.status}`);
      });
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
      .then((res) => {
        if (res.ok) return res.json();
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject(`Ошибка ${res.status}`);
      });
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
    }).then((res) => {
      if (res.ok) return res.json();
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }

  removeCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) return res.json();
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }

  addLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) return res.json();
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }
}
