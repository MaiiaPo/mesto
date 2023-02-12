const elements = document.querySelector('.elements');

const popupProfile = document.querySelector('.popup_edit');
const formProfile = document.querySelector('.popup__form_edit');
const popupProfileCloseButton = document.querySelector('.popup__close_edit');
const popupProfileOpenButton = document.querySelector('.profile__edit');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');

const popupNewCard = document.querySelector('.popup_add');
const formNewCard = document.querySelector('.popup__form_add');
const popupNewCardCloseButton = document.querySelector('.popup__close_add');
const popupNewCardOpenButton = document.querySelector('.profile__add-button');

const inputNamePlace = document.querySelector('.popup__input_type_name-place');
const inputLinkImg = document.querySelector('.popup__input_type_link');

const popupFullImg = document.querySelector('.popup_image');
const fullImg = document.querySelector('.full__image');
const fullCaption = document.querySelector('.full__caption');
const popupFullImgCloseButton = document.querySelector('.popup__close_image');

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

function closePopup(popup, form = '') {
  popup.classList.remove('popup_opened');
  if (form) {
    clearErrors(form);
    form.reset();
  }
}

// Закрытие окна попапа, если мышь нажата вне окна
// или нажата клавиша Escape
function closePopupOutside(e) {
  const formElements = document.querySelectorAll('.popup__form');
  const popupElements = document.querySelectorAll('.popup');
  // eslint-disable-next-line no-shadow
  formElements.forEach((form) => {
    popupElements.forEach((pop) => {
      if (e.target === pop) {
        closePopup(pop, form);
      }
      if (e.key === 'Escape') {
        closePopup(pop, form);
      }
    });
  });

  document.removeEventListener('mousedown', closePopupOutside);
  document.removeEventListener('keyup', closePopupOutside);
}

// Блокировка кнопки
function disableButton(form) {
  const submit = form.querySelector('.popup__button');
  submit.classList.add('popup__button_disabled');
  submit.disabled = true;
}

function openPopup(popup, form = '') {
  popup.classList.add('popup_opened');

  document.addEventListener('mousedown', closePopupOutside);
  document.addEventListener('keyup', closePopupOutside);

  // Блокировка кнопки отправки при открытии формы:
  // пока нет изменений или пока не заполнены данные
  if (form) {
    disableButton(form);
  }
}

function openPopupEdit(popup, form) {
  openPopup(popup, form);

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

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
    openPopup(popupFullImg);
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

// При сохранении закрываем окно, если нет изменений
// и изменяем значения в профиле, если есть изменения
function onSavePopup(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupProfile, formProfile);
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
  closePopup(popupNewCard, formNewCard);
}

function keyHandlerAddNewCard(evt) {
  if (evt.key === 'Enter') {
    addNewCard(evt);
  }
}

function keyHandlerOnSavePopup(evt) {
  if (evt.key === 'Enter') {
    onSavePopup(evt);
  }
}

popupProfileOpenButton.addEventListener('click', () => openPopupEdit(popupProfile, formProfile));
formProfile.addEventListener('submit', onSavePopup);
inputName.addEventListener('keydown', keyHandlerOnSavePopup);
inputDescription.addEventListener('keydown', keyHandlerOnSavePopup);
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile, formProfile));

popupNewCardOpenButton.addEventListener('click', () => openPopup(popupNewCard, formNewCard));
formNewCard.addEventListener('submit', addNewCard);
inputNamePlace.addEventListener('keydown', keyHandlerAddNewCard);
inputLinkImg.addEventListener('keydown', keyHandlerAddNewCard);
popupNewCardCloseButton.addEventListener('click', () => closePopup(popupNewCard, formNewCard));
popupFullImgCloseButton.addEventListener('click', () => closePopup(popupFullImg));
