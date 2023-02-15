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

// Очищает значения ошибок
function clearErrors(form) {
  const elementsForm = Array.from(form.elements);
  // Находим все input в форме
  const inputs = elementsForm.filter((el) => el.tagName.toLowerCase() === 'input' && el.getAttribute('type') !== 'submit');

  inputs.forEach((inp) => {
    if (inp.classList.contains('popup__input_type_error')) {
      // eslint-disable-next-line no-undef
      hideInputError(form, inp, { inputErrorClass: 'popup__input_type_error', errorClass: 'popup__error_visible' });
    }
  });
}

// Отписываемся от событий
function removeEvents() {
  document.removeEventListener('mousedown', closePopupMouse);
  document.removeEventListener('keyup', closePopupKey);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeEvents();
}

// Очистка формы
function resetForm(form) {
  clearErrors(form);
  form.reset();
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

function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('mousedown', closePopupMouse);
  document.addEventListener('keyup', closePopupKey);
}

function openPopupWithForm(popup, form) {
  openPopup(popup);
  const button = form.querySelector('.popup__button');
  // eslint-disable-next-line no-undef
  disabledButton(button, 'popup__button_disabled');
}

function openPopupEdit(popup, form) {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  openPopupWithForm(popup, form);
}

// Создание карточки
function createCard(cardItem) {
  const cardTemplate = document.querySelector('#element').content;
  const card = cardTemplate.querySelector('.element').cloneNode(true);

  const img = card.querySelector('.element__image');
  const title = card.querySelector('.element__title');

  img.src = cardItem.link;
  img.alt = cardItem.name;
  title.textContent = cardItem.name;

  // отметка "нравится"
  card.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });

  // удалить карточку
  card.querySelector('.element__delete').addEventListener('click', () => {
    card.remove();
  });

  // открыть изображение на полный экран
  img.addEventListener('click', () => {
    fullCaption.textContent = cardItem.name;
    fullImg.src = cardItem.link;
    fullImg.alt = cardItem.name;
    openPopup(fullImgPopup);
  });

  return card;
}

// Добавление карточки
function renderCard(card, method) {
  if (method === 'append') {
    elements.append(card);
  } else {
    elements.prepend(card);
  }
}

// отображение карточек
// eslint-disable-next-line no-undef
initialCards.forEach((card) => renderCard(createCard(card), 'append'));

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

  renderCard(createCard(newCard), 'prepend');
  closePopup(addCardPopup, addCardForm);
  resetForm(addCardForm);
}

profileOpenButton.addEventListener('click', () => openPopupEdit(profilePopup, profileForm));
profileForm.addEventListener('submit', saveProfilePopup);
profileCloseButton.addEventListener('click', () => { closePopup(profilePopup); resetForm(profileForm); });

addCardOpenButton.addEventListener('click', () => openPopupWithForm(addCardPopup, addCardForm));
addCardForm.addEventListener('submit', saveAddNewCard);
addCardCloseButton.addEventListener('click', () => { closePopup(addCardPopup); resetForm(addCardForm); });
fullImgCloseButton.addEventListener('click', () => closePopup(fullImgPopup));
