export const buttonOpenProfileForm = document.querySelector('.profile__edit');

export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const formProfileInputName = document.querySelector('.popup__input_type_name');
export const formProfileInputDescription = document.querySelector('.popup__input_type_description');

export const buttonOpenFormAddCard = document.querySelector('.profile__add-button');
export const formAddCardInputNamePlace = document.querySelector('.popup__input_type_name-place');
export const formAddCardInputLinkImg = document.querySelector('.popup__input_type_link');

export const imgPopupFullScreen = document.querySelector('.full__image');
export const captionPopupFullScreen = document.querySelector('.full__caption');

export const settingsValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];
