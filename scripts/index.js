const initialCards = [
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
const elements = document.querySelector('.elements');

const popupEdit = document.querySelector('.popup_edit');
const formEdit = document.querySelector('.popup__form_edit');
const closeEdit = document.querySelector('.popup__close_edit');
const editButton = document.querySelector('.profile__edit');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input-text_type_name');
const inputDescription = document.querySelector('.popup__input-text_type_description');

const popupAdd = document.querySelector('.popup_add');
const formAdd = document.querySelector('.popup__form_add');
const closeAdd = document.querySelector('popup__close_add');
const addButton = document.querySelector('.profile__add-button');

const inputNamePlace = document.querySelector('.popup__input-text_type_name-place');
const inputLinkImg = document.querySelector('.popup__input-text_type_link');

const popupImg = document.querySelector('.popup_image');
const fullImg = document.querySelector('.full__image');
const fullCaption = document.querySelector('.full__caption');
const closeFull = document.querySelector('.popup__close_image');

function initCard(card, method) {
  const elementTemplate = document.querySelector('#element').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);

  const img = element.querySelector('.element__image');
  const title = element.querySelector('.element__title');

  img.src = card.link;
  img.alt = card.name;
  title.textContent = card.name;

  // отметка "нравится"
  element.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });

  // удалить
  element.querySelector('.element__delete').addEventListener('click', (evt) => {
    const cardItem = evt.target.closest('.element');
    cardItem.remove();
  });

  // открыть изображение на полный экран
  element.querySelector('.element__image').addEventListener('click', (evt) => {
    const cardElem = evt.target.closest('.element');
    fullCaption.textContent = cardElem.querySelector('.element__title').textContent;
    fullImg.src = cardElem.querySelector('.element__image').src;
    fullImg.alt = cardElem.querySelector('.element__title').textContent;
    popupImg.classList.add('popup_opened');
  });

  if (method === 'append') {
    elements.append(element);
  }

  if (method === 'prepend') {
    elements.prepend(element);
  }
}

// отображение карточек
initialCards.forEach((card) => initCard(card, 'append'));

// Открыть попап "Редактирование профиля"
// Заполнение полей инпута "Имя" и "О себе": те же, что отображаются на странице
function openPopupEdit() {
  popupEdit.classList.add('popup_opened');

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

// Открыть попап добавления карточки
function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
}

// Закрытие модальных окон
function closePopup() {
  if (popupAdd.classList.contains('popup_opened')) {
    popupAdd.classList.remove('popup_opened');
  }

  if (popupEdit.classList.contains('popup_opened')) {
    popupEdit.classList.remove('popup_opened');
  }

  if (popupImg.classList.contains('popup_opened')) {
    popupImg.classList.remove('popup_opened');
  }
}

// При сохранении закрываем окно, если нет изменений
// и изменяем значения в профиле, если есть изменения
function onSavePopup(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup();
}

// Добавление новой карточки
function addNewCard(event) {
  event.preventDefault();

  const newCard = {
    name: inputNamePlace.value,
    link: inputLinkImg.value,
  };
  initCard(newCard, 'prepend');
  closePopup();
}

editButton.addEventListener('click', openPopupEdit);
formEdit.addEventListener('submit', onSavePopup);
closeEdit.addEventListener('click', closePopup);

addButton.addEventListener('click', openPopupAdd);
formAdd.addEventListener('submit', addNewCard);
closeAdd.addEventListener('click', closePopup);
closeFull.addEventListener('click', closePopup);
