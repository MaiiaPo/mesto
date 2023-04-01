/* eslint-disable no-underscore-dangle */
export default class Api {
  constructor(token, groupId) {
    this.__token = token;
    this.__groupId = groupId;
  }

  // Получение существующих карточек с сервера
  getInitialCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this.__groupId}/cards`, {
      headers: {
        authorization: this.__token,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject(`Ошибка ${res.status}`);
      });
  }

  getUserData() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this.__groupId}/users/me`, {
      headers: {
        authorization: this.__token,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.ok) return res.json();
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject(`Ошибка ${res.status}`);
      });
  }

  updateUserData(userData) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-62/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this.__token,
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
}
