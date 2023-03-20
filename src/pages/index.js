/* eslint-disable import/extensions */
import './index.css';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import {
  initialCards,
  settingsValidation,
  buttonOpenProfileForm,
  profileName,
  profileDescription,
  formProfileInputName,
  formProfileInputDescription,
  buttonOpenFormAddCard,
  formAddCardInputNamePlace,
  formAddCardInputLinkImg,
  imgPopupFullScreen,
  captionPopupFullScreen,
} from '../utils/constants.js';

const profileFormValidate = new FormValidator(document.forms.profile, settingsValidation);
const addCardFormValidate = new FormValidator(document.forms.place, settingsValidation);

const userInfo = new UserInfo(profileName, profileDescription);

const openFullScreen = (name, link) => {
  captionPopupFullScreen.textContent = name;
  imgPopupFullScreen.src = link;
  imgPopupFullScreen.alt = name;

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

// Добавление новой карточки
const saveAddNewCard = (event) => {
  event.preventDefault();

  const newCard = {
    name: formAddCardInputNamePlace.value,
    link: formAddCardInputLinkImg.value,
  };

  const arrCard = [];
  arrCard.push(newCard);

  const cardElement = new Section({ data: arrCard }, 'prepend', '.elements', openFullScreen);
  cardElement.renderItems();

  popupAddCardForm.close();
};

const popupProfileForm = new PopupWithForm('.popup_type_edit', saveProfilePopup);
const popupAddCardForm = new PopupWithForm('.popup_type_add', saveAddNewCard);
const popupCardImg = new PopupWithImage('.popup_image');

popupProfileForm.setEventListeners();
popupAddCardForm.setEventListeners();
popupCardImg.setEventListeners();

// Создание карточек по умолчанию
const defaultCardList = new Section({ data: initialCards }, 'append', '.elements', openFullScreen);
defaultCardList.renderItems();

const openPopupEditProfile = () => {
  const getUser = userInfo.getUser();

  if (formProfileInputName.value === '' && formProfileInputDescription.value === '') {
    formProfileInputName.value = getUser.name;
    formProfileInputDescription.value = getUser.description;
  }

  if (formProfileInputName.value === profileName.textContent
    && formProfileInputDescription.value === profileDescription.textContent) {
    profileFormValidate.disabledButton();
  }

  profileFormValidate.clearErrors();
  popupProfileForm.open();
};

buttonOpenProfileForm.addEventListener('click', () => { openPopupEditProfile(); });
buttonOpenFormAddCard.addEventListener('click', () => { addCardFormValidate.clearErrors(); popupAddCardForm.open(); });
