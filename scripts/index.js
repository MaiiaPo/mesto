const elements = document.querySelector('.elements');

const popupProfile = document.querySelector('.popup_edit');
const formProfile = document.querySelector('.popup__form_edit');
const popupProfileCloseButton = document.querySelector('.popup__close_edit');
const popupProfileOpenButton = document.querySelector('.profile__edit');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input-text_type_name');
const inputDescription = document.querySelector('.popup__input-text_type_description');

const popupNewCard = document.querySelector('.popup_add');
const formNewCard = document.querySelector('.popup__form_add');
const popupNewCardCloseButton = document.querySelector('.popup__close_add');
const popupNewCardOpenButton = document.querySelector('.profile__add-button');

const inputNamePlace = document.querySelector('.popup__input-text_type_name-place');
const inputLinkImg = document.querySelector('.popup__input-text_type_link');

const popupFullImg = document.querySelector('.popup_image');
const fullImg = document.querySelector('.full__image');
const fullCaption = document.querySelector('.full__caption');
const popupFullImgCloseButton = document.querySelector('.popup__close_image');

// Создание карточки
function initCard(cardItem) {
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
  card.querySelector('.element__image').addEventListener('click', () => {
    fullCaption.textContent = card.querySelector('.element__title').textContent;
    fullImg.src = card.querySelector('.element__image').src;
    fullImg.alt = card.querySelector('.element__title').textContent;
    popupFullImg.classList.add('popup_opened');
  });

  return card;
}

// Добавление карточки
function renderCard(card, method) {
  if (method === 'append') {
    elements.append(card);
  }

  if (method === 'prepend') {
    elements.prepend(card);
  }
}

// отображение карточек
// eslint-disable-next-line no-undef
initialCards.forEach((card) => renderCard(initCard(card), 'append'));

function openPopup(popup) {
  popup.classList.add('popup_opened');

  const openPopupForm = document.querySelector('.popup_opened');
  if (openPopupForm.classList.contains('popup_edit')) {
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// При сохранении закрываем окно, если нет изменений
// и изменяем значения в профиле, если есть изменения
function onSavePopup(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupProfile);
}

// Добавление новой карточки
function addNewCard(event) {
  event.preventDefault();

  const newCard = {
    name: inputNamePlace.value,
    link: inputLinkImg.value,
  };

  renderCard(initCard(newCard), 'prepend');

  inputNamePlace.value = '';
  inputLinkImg.value = '';
  closePopup(popupNewCard);
}

popupProfileOpenButton.addEventListener('click', () => openPopup(popupProfile));
formProfile.addEventListener('submit', onSavePopup);
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));

popupNewCardOpenButton.addEventListener('click', () => openPopup(popupNewCard));
formNewCard.addEventListener('submit', addNewCard);
popupNewCardCloseButton.addEventListener('click', () => closePopup(popupNewCard));
popupFullImgCloseButton.addEventListener('click', () => closePopup(popupFullImg));
