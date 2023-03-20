/* eslint-disable import/extensions */
import './index.css';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { initialCards } from '../utils/initialCards.js';
import UserInfo from '../components/UserInfo.js';

const buttonOpenProfileForm = document.querySelector('.profile__edit');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formProfileInputName = document.querySelector('.popup__input_type_name');
const formProfileInputDescription = document.querySelector('.popup__input_type_description');

const buttonOpenFormAddCard = document.querySelector('.profile__add-button');
const formAddCardInputNamePlace = document.querySelector('.popup__input_type_name-place');
const formAddCardInputLinkImg = document.querySelector('.popup__input_type_link');

const imgPopupFullScreen = document.querySelector('.full__image');
const captionPopupFullScreen = document.querySelector('.full__caption');

const settingsValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

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
  userInfo.setUserInfo(formProfileInputName.value, formProfileInputDescription.value);
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
