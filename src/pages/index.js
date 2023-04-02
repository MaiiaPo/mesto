/* eslint-disable import/extensions */
import './index.css';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  settingsValidation,
  cardsSelector,
  buttonOpenProfileForm,
  profileName,
  profileDescription,
  formProfileInputName,
  formProfileInputDescription,
  buttonOpenFormAddCard,
} from '../utils/constants.js';

const profileFormValidate = new FormValidator(document.forms.profile, settingsValidation);
const addCardFormValidate = new FormValidator(document.forms.place, settingsValidation);

const userInfo = new UserInfo(profileName, profileDescription);

const api = new Api('2966f134-ddf9-4ef6-92e6-3cc74f9bff8f', 'cohort-62');

/**
 * Создание карточки
 */
const createCard = (item, selector) => {
  const card = new Card(item, selector, openFullScreen, openConfirm);
  return card.createCard();
};

/**
 * Отрисовка карточек на странице
 */
const defaultCardList = new Section(
  {
    renderer: (item, isAppend) => {
      const defaultCard = createCard(item, '#element');
      defaultCardList.setItem(defaultCard, isAppend);
    },
  },
  cardsSelector,
);

/**
 * Получение карточек и информации о пользователе с сервера.
 * Отображение на странице.
 */
Promise.all([api.getInitialCards(), api.getUserData()])
  .then(([cardsArray, userData]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    defaultCardList.renderItems(cardsArray, true);
  })
  .catch((err) => {
    console.err(err);
  });

/**
 * Открытие изображение карточки на полный экран
 */
const openFullScreen = (name, link) => {
  popupCardImg.open(name, link);
};

const openConfirm = () => {
  popupDeleteCardConfirm.open();
};

/**
 * Сохраняем новые значения профиля
 */
const saveProfilePopup = (values) => {
  userInfo.setUserInfo(values.name, values.description);
  api.updateUserData(values)
    .then((res) => {
      popupProfileForm.close();
    })
    .catch((err) => {
      console.err(err);
    });
};

// Добавление новой карточки
const saveAddNewCard = (values) => {
  const newCard = {
    name: values['name-place'],
    link: values.link,
  };

  api.addCard(newCard)
    .then((dataCard) => {
      defaultCardList.renderItems([dataCard], false);
      popupAddCardForm.close();
    })
    .catch((err) => {
      console.err(err);
    });
};

const deleteCard = () => {
  popupDeleteCardConfirm.close();
};

const popupProfileForm = new PopupWithForm('.popup_type_edit', saveProfilePopup);
const popupAddCardForm = new PopupWithForm('.popup_type_add', saveAddNewCard);
const popupDeleteCardConfirm = new PopupWithForm('.popup_type_confirm', deleteCard);

const popupCardImg = new PopupWithImage('.popup_image');

popupProfileForm.setEventListeners();
popupAddCardForm.setEventListeners();
popupDeleteCardConfirm.setEventListeners();
popupCardImg.setEventListeners();

const openPopupEditProfile = () => {
  const getUser = userInfo.getUser();

  formProfileInputName.value = getUser.name;
  formProfileInputDescription.value = getUser.description;

  profileFormValidate.clearErrors();
  popupProfileForm.open();
};

buttonOpenProfileForm.addEventListener('click', () => { openPopupEditProfile(); });
buttonOpenFormAddCard.addEventListener('click', () => {
  addCardFormValidate.disabledButton();
  addCardFormValidate.clearErrors();
  popupAddCardForm.open();
});
