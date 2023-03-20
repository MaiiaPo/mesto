/* eslint-disable import/extensions */
import './index.css';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

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
  formAddCardInputNamePlace,
  formAddCardInputLinkImg,
} from '../utils/constants.js';

const profileFormValidate = new FormValidator(document.forms.profile, settingsValidation);
const addCardFormValidate = new FormValidator(document.forms.place, settingsValidation);

const userInfo = new UserInfo(profileName, profileDescription);

const openFullScreen = (name, link) => {
  popupCardImg.open(name, link);
};

// При сохранении закрываем окно, если нет изменений
// и изменяем значения в профиле, если есть изменения
const saveProfilePopup = (event) => {
  event.preventDefault();
  const formValues = popupProfileForm.getInputValues();
  userInfo.setUserInfo(formValues.name, formValues.description);
  popupProfileForm.close();
};

const createCard = (item, selector) => {
  const card = new Card(item, selector, openFullScreen);
  return card.createCard();
};

// Создание карточек по умолчанию
const defaultCardList = new Section(
  {
    renderer: (item, isAppend) => {
      const defaultCard = createCard(item, '#element');
      defaultCardList.setItem(defaultCard, isAppend);
    },
  },
  cardsSelector,
);
defaultCardList.renderItems(initialCards, true);

// Добавление новой карточки
const saveAddNewCard = (event) => {
  event.preventDefault();

  const newCard = {
    name: formAddCardInputNamePlace.value,
    link: formAddCardInputLinkImg.value,
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
