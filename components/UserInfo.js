/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
export default class UserInfo {
  constructor(nameUser, descriptionUser) {
    this._nameUser = nameUser;
    this._descriptionUser = descriptionUser;
  }

  getUser() {
    return {
      name: this._nameUser.textContent,
      description: this._descriptionUser.textContent,
    };
  }

  setUserInfo(name, description) {
    if (name) {
      this._nameUser.textContent = name;
    }

    if (description) {
      this._descriptionUser.textContent = description;
    }
  }
}
