/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
export default class UserInfo {
  constructor(nameUser, descriptionUser, avatar) {
    this._nameUser = nameUser;
    this._descriptionUser = descriptionUser;
    this._avatar = avatar;
  }

  getUser() {
    return {
      name: this._nameUser.textContent,
      description: this._descriptionUser.textContent,
    };
  }

  setUserInfo({ name, description, avatar }) {
    if (name) {
      this._nameUser.textContent = name;
    }

    if (description) {
      this._descriptionUser.textContent = description;
    }

    if (avatar) {
      this._avatar.src = avatar;
    }
  }

  getUserAvatar() {
    return this._avatar.value;
  }
}
