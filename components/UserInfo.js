/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
export default class UserInfo {
  constructor(nameUser, descriptionUser) {
    this._nameUser = nameUser;
    this._descriptionUser = descriptionUser;
  }

  getUser() {
    return {
      name: this._nameUser,
      description: this._descriptionUser,
    };
  }

  setUserInfo(name, description) {
    const profileName = document.querySelector('.profile__name');
    const profileDescription = document.querySelector('.profile__description');

    profileName.textContent = name;
    profileDescription.textContent = description;
  }
}
