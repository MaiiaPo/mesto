/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
import './index.css';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  settingsValidation,
  cardsSelector,
  buttonOpenProfileForm,
  profileName,
  profileDescription,
  profileAvatarImg,
  formProfileInputName,
  formProfileInputDescription,
  buttonOpenFormAddCard,
  profileAvatar,
} from '../utils/constants.js';
import PopupConfirm from '../components/PopupConfirm';

const api = new Api('2966f134-ddf9-4ef6-92e6-3cc74f9bff8f', 'cohort-62');
const userInfo = new UserInfo(profileName, profileDescription, profileAvatarImg);
let userId = '';

/**
 * Изменение аватара пользователя
 */
const saveProfileAvatar = (values) => {
  popupProfileEditAvatarForm.loading(true);
  api.editAvatar(values['avatar-link'])
    .then(() => {
      popupProfileEditAvatarForm.close();
      userInfo.setUserInfo({ avatar: values['avatar-link'] });
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupProfileEditAvatarForm.loading(false);
    });
};

/**
 * Сохраняем новые значения профиля
 */
const saveProfilePopup = (values) => {
  userInfo.setUserInfo({ name: values.name, description: values.description });
  popupProfileForm.loading(true);
  api.updateUserData(values)
    .then(() => {
      popupProfileForm.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => popupProfileForm.loading(false));
};

/**
 * Создание карточки
 */
const createCard = (item, selector) => {
  const card = new Card(item, selector, userId, openFullScreen, openConfirm, setLike, deleteLike);
  return card.createCard();
};

/**
 * Добавление новой карточки
 */
const saveAddNewCard = (values) => {
  const newCard = {
    name: values['name-place'],
    link: values.link,
  };
  popupAddCardForm.loading(true);

  api.addCard(newCard)
    .then((dataCard) => {
      const addedCard = createCard(dataCard, '#element');
      defaultCardList.setItem(addedCard, false);
      popupAddCardForm.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => popupAddCardForm.loading(false));
};

const profileFormValidate = new FormValidator(document.forms.profile, settingsValidation);
const addCardFormValidate = new FormValidator(document.forms.place, settingsValidation);
const editAvatarFormValidate = new FormValidator(document.forms['edit-avatar'], settingsValidation);

const popupProfileForm = new PopupWithForm('.popup_type_edit', saveProfilePopup);
const popupProfileEditAvatarForm = new PopupWithForm('.popup_type_edit-avatar', saveProfileAvatar);
const popupAddCardForm = new PopupWithForm('.popup_type_add', saveAddNewCard);
const popupDeleteCardConfirm = new PopupConfirm('.popup_type_confirm');
const popupCardImg = new PopupWithImage('.popup_image');

popupProfileForm.setEventListeners();
popupProfileEditAvatarForm.setEventListeners();
popupAddCardForm.setEventListeners();
popupDeleteCardConfirm.setEventListeners();
popupCardImg.setEventListeners();

/**
 * Отрисовка карточек на странице
 */
const defaultCardList = new Section(
  {
    renderer: (item, isAppend) => {
      const defaultCard = createCard(item, '#element');
      defaultCardList.setItem(defaultCard, isAppend);
    },
  },
  cardsSelector,
);

/**
 * Получение карточек и информации о пользователе с сервера.
 * Отображение на странице.
 */
Promise.all([api.getInitialCards(), api.getUserData()])
  .then(([cardsArray, userData]) => {
    // eslint-disable-next-line no-underscore-dangle
    userId = userData._id;
    const { name, about, avatar } = userData;
    userInfo.setUserInfo({ name, description: about, avatar });
    defaultCardList.renderItems(cardsArray, true);
  })
  .catch((err) => {
    console.error(err);
  });

/**
 * Открытие изображение карточки на полный экран
 */
const openFullScreen = (name, link) => {
  popupCardImg.open(name, link);
};

/**
 * Открытие окна предупреждения об удалении
 * */
const openConfirm = (card) => {
  popupDeleteCardConfirm.open();
  popupDeleteCardConfirm.submitAction(() => {
    // eslint-disable-next-line no-underscore-dangle
    api.removeCard(card.cardId)
      .then(() => {
        card.handleRemoveCard();
        popupDeleteCardConfirm.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

/**
 * Установка лайка
 */
const setLike = (card) => {
  api.addLike(card.cardId)
    .then((res) => {
      card.updateLikes(res);
    })
    .catch((err) => console.error(err));
};

/**
 * Удаление лайка
 */
const deleteLike = (card) => {
  api.removeLike(card.cardId)
    .then((res) => {
      card.updateLikes(res);
    })
    .catch((err) => console.error(err));
};

const openPopupEditProfile = () => {
  const getUser = userInfo.getUser();

  formProfileInputName.value = getUser.name;
  formProfileInputDescription.value = getUser.description;

  profileFormValidate.clearErrors();
  popupProfileForm.open();
};

buttonOpenProfileForm.addEventListener('click', () => { openPopupEditProfile(); });
buttonOpenFormAddCard.addEventListener('click', () => {
  addCardFormValidate.disabledButton();
  addCardFormValidate.clearErrors();
  popupAddCardForm.open();
});
profileAvatar.addEventListener('click', () => {
  editAvatarFormValidate.disabledButton();
  editAvatarFormValidate.clearErrors();
  popupProfileEditAvatarForm.open();
});
