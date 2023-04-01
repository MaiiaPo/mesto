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
}
