const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit');
const close = document.querySelector('.popup__close');
const form = document.querySelector('.popup__form');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input-text_type_name');
const inputDescription = document.querySelector('.popup__input-text_type_description');

// Заполнение полей инпута "Имя" и "О себе": те же, что отображаются на странице
function fillFields() {
  popup.classList.add('popup_opened');

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

// При сохранении закрываем окно, если нет изменений
// и изменяем значения в профиле, если есть изменения
function onSavePopup() {
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  popup.classList.remove('popup_opened');
}

// Закрытие модального окна
function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', fillFields);
form.addEventListener('submit', onSavePopup);
close.addEventListener('click', closePopup);
