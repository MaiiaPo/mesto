import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { initialCards } from '../utils/initialCards.js';

const elements = document.querySelector('.elements');

const popupProfile = document.querySelector('.popup_type_edit');
const formProfile = document.querySelector('.popup__form_edit');
const buttonCloseProfileForm = document.querySelector('.popup__close_edit');
const buttonOpenProfileForm = document.querySelector('.profile__edit');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formProfileInputName = document.querySelector('.popup__input_type_name');
const formProfileInputDescription = document.querySelector('.popup__input_type_description');

const popupAddCard = document.querySelector('.popup_type_add');
const formAddCard = document.querySelector('.popup__form_add');
const buttonCloseFormAddCard = document.querySelector('.popup__close_add'); 
const buttonOpenFormAddCard = document.querySelector('.profile__add-button');
const formAddCardInputNamePlace = document.querySelector('.popup__input_type_name-place');
const formAddCardInputLinkImg = document.querySelector('.popup__input_type_link');

const popupFullScreenCardImage = document.querySelector('.popup_image');
const imgPopupFullScreen = document.querySelector('.full__image');
const captionPopupFullScreen = document.querySelector('.full__caption');
const buttonClosePopupFullScreenCardImage = document.querySelector('.popup__close_image');

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

// Создание карточек по умолчанию
const defaultCardList = new Section({ data: initialCards }, 'append', '.elements');
defaultCardList.renderItems();

// Подписка на события
function addEvents() {
  document.addEventListener('mousedown', closePopupMouse);
  document.addEventListener('keyup', closePopupKey);
}

// Отписываемся от событий
function removeEvents() {
  document.removeEventListener('mousedown', closePopupMouse);
  document.removeEventListener('keyup', closePopupKey);
}

// Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  addEvents();
}

function openPopupEdit(popup) {
  if (formProfileInputName.value === '' && formProfileInputDescription.value === '') {
    formProfileInputName.value = profileName.textContent;
    formProfileInputDescription.value = profileDescription.textContent;
  }

  if (formProfileInputName.value === profileName.textContent
    && formProfileInputDescription.value === profileDescription.textContent) {
    profileFormValidate.disabledButton();
  }

  profileFormValidate.clearErrors();
  openPopup(popup);
}

function openPopupAddCard(popup) {
  if (formAddCardInputNamePlace.value === '' || formAddCardInputLinkImg.value === '') {
    addCardFormValidate.disabledButton();
  }
  openPopup(popup);
}

// Очистка формы
function resetForm(form) {
  form.reset();
}

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeEvents();
}

// Закрытие окна попапа по клавише Escape
function closePopupKey(evt) {
  if (evt.key === 'Escape') {
    const popupElement = document.querySelector('.popup_opened');
    closePopup(popupElement);
  }
}

// Закрытие окна попапа по мышке вне области
function closePopupMouse(evt) {
  const popupElement = document.querySelector('.popup_opened');
  if (evt.target === popupElement) {
    closePopup(popupElement);
  }
}

// Добавление карточки
function renderCard(card, cardItem, method) {
  if (method === 'append') {
    elements.append(card);
  } else {
    elements.prepend(card);
  }
}

const openFullScreen = (name, link) => {
  captionPopupFullScreen.textContent = name;
  imgPopupFullScreen.src = link;
  imgPopupFullScreen.alt = name;

  openPopup(popupFullScreenCardImage);
};

// Создание карточки
function generateCard(cardItem, method) {
  const card = new Card(cardItem, '#element', openFullScreen);
  renderCard(card.createCard(), cardItem, method);
}

// При сохранении закрываем окно, если нет изменений
// и изменяем значения в профиле, если есть изменения
function saveProfilePopup(event) {
  event.preventDefault();
  profileName.textContent = formProfileInputName.value;
  profileDescription.textContent = formProfileInputDescription.value;
  closePopup(popupProfile, formProfile);
  resetForm(formProfile);
}

// Добавление новой карточки
function saveAddNewCard(event) {
  event.preventDefault();

  const newCard = {
    name: formAddCardInputNamePlace.value,
    link: formAddCardInputLinkImg.value,
  };

  const arrCard = [];
  arrCard.push(newCard);

  const сardElement = new Section({ data: arrCard }, 'prepend', '.elements');
  сardElement.renderItems();

  closePopup(popupAddCard);
  resetForm(formAddCard);
}

formProfile.addEventListener('submit', saveProfilePopup);
buttonOpenProfileForm.addEventListener('click', () => openPopupEdit(popupProfile, formProfile));
buttonCloseProfileForm.addEventListener('click', () => { closePopup(popupProfile); });

formAddCard.addEventListener('submit', saveAddNewCard);
buttonOpenFormAddCard.addEventListener('click', () => openPopupAddCard(popupAddCard));
buttonCloseFormAddCard.addEventListener('click', () => { closePopup(popupAddCard); });

buttonClosePopupFullScreenCardImage.addEventListener('click', () => closePopup(popupFullScreenCardImage));
