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
  initialCards,
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
  const card = new Card(item, selector, openFullScreen);
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
 * Получение карточек с сервера
 */
Promise.all([api.getInitialCards()])
  .then((cardsArray) => {
    defaultCardList.renderItems(cardsArray[0], true);
  })
  .catch((err) => {
    console.log(err);
  });

const openFullScreen = (name, link) => {
  popupCardImg.open(name, link);
};

// При сохранении закрываем окно, если нет изменений
// и изменяем значения в профиле, если есть изменения
const saveProfilePopup = (values) => {
  userInfo.setUserInfo(values.name, values.description);
  popupProfileForm.close();
};



// Добавление новой карточки
const saveAddNewCard = (values) => {
  const newCard = {
    name: values['name-place'],
    link: values.link,
  };

  const arrCard = [];
  arrCard.push(newCard);
  defaultCardList.renderItems(arrCard, false);

  popupAddCardForm.close();
};

const popupProfileForm = new PopupWithForm('.popup_type_edit', saveProfilePopup);
const popupAddCardForm = new PopupWithForm('.popup_type_add', saveAddNewCard);
const popupCardImg = new PopupWithImage('.popup_image');

popupProfileForm.setEventListeners();
popupAddCardForm.setEventListeners();
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
