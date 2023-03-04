import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './initialCards.js';

const elements = document.querySelector('.elements');

const profilePopup = document.querySelector('.popup_type_edit');
const profileForm = document.querySelector('.popup__form_edit');
const profileCloseButton = document.querySelector('.popup__close_edit');
const profileOpenButton = document.querySelector('.profile__edit');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');

const addCardPopup = document.querySelector('.popup_type_add');
const addCardForm = document.querySelector('.popup__form_add');
const addCardCloseButton = document.querySelector('.popup__close_add');
const addCardOpenButton = document.querySelector('.profile__add-button');
const inputNamePlace = document.querySelector('.popup__input_type_name-place');
const inputLinkImg = document.querySelector('.popup__input_type_link');

const fullImgPopup = document.querySelector('.popup_image');
const fullImg = document.querySelector('.full__image');
const fullCaption = document.querySelector('.full__caption');
const fullImgCloseButton = document.querySelector('.popup__close_image');

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
  if (inputName.value === '' && inputDescription.value === '') {
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
  }

  if (inputName.value === profileName.textContent
      && inputDescription.value === profileDescription.textContent) {
    profileFormValidate.clearErrors();
    profileFormValidate.disabledButton();
  }

  openPopup(popup);
}

function openPopupAddCard(popup) {
  if (inputNamePlace.value === '' || inputLinkImg.value === '') {
    addCardFormValidate.disabledButton();
  }
  openPopup(popup);
}

// Очистка формы
function resetForm(form) {
  form.reset();
}

function openFullScreen(card) {
  fullCaption.textContent = card.name;
  fullImg.src = card.link;
  fullImg.alt = card.name;

  openPopup(fullImgPopup);
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
    // todo вынести в метод
    card.querySelector('.element__image').addEventListener('click', () => {
      openFullScreen(cardItem);
    });
  } else {
    elements.prepend(card);
  }
}

// отображение карточек
// eslint-disable-next-line no-undef
initialCards.forEach((cardItem) => {
  const card = new Card(cardItem, '#element');
  renderCard(card.createCard(), cardItem, 'append');
});

// При сохранении закрываем окно, если нет изменений
// и изменяем значения в профиле, если есть изменения
function saveProfilePopup(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(profilePopup, profileForm);
  resetForm(profileForm);
}

// Добавление новой карточки
function saveAddNewCard(event) {
  event.preventDefault();

  const newCard = {
    name: inputNamePlace.value,
    link: inputLinkImg.value,
  };

  const card = new Card(newCard, '#element');
  renderCard(card.createCard(), newCard, 'prepend');
  closePopup(addCardPopup);
  resetForm(addCardForm);
}

profileOpenButton.addEventListener('click', () => openPopupEdit(profilePopup, profileForm));
profileForm.addEventListener('submit', saveProfilePopup);
profileCloseButton.addEventListener('click', () => { closePopup(profilePopup); });

addCardOpenButton.addEventListener('click', () => openPopupAddCard(addCardPopup));
addCardForm.addEventListener('submit', saveAddNewCard);
addCardCloseButton.addEventListener('click', () => { closePopup(addCardPopup); });
fullImgCloseButton.addEventListener('click', () => closePopup(fullImgPopup));
