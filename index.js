function editProfile() {
  const popup = document.querySelector('.popup');
  const editButton = document.querySelector('.profile__edit');
  const close = document.querySelector('.popup__close');
  const save = document.querySelector('.popup__submit-btn');

  // open modal
  editButton.addEventListener('click', () => {
    popup.classList.add('popup__opened');

    const profileName = document.querySelector('.profile__name');
    const profileDescription = document.querySelector('.profile__description');

    const inputName = document.querySelector('.popup__input-text_type_name');
    const inputDescription = document.querySelector('.popup__input-text_type_description');

    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;

    // save modal
    save.addEventListener('click', () => {
      if (inputName.value === profileName.textContent
        && inputDescription.value === profileDescription.textContent) {
        popup.classList.remove('popup__opened');
      } else {
        profileName.textContent = inputName.value;
        profileDescription.textContent = inputDescription.value;
        popup.classList.remove('popup__opened');
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        save.click();
      }
    });
  });

  // close modal
  close.addEventListener('click', () => {
    popup.classList.remove('popup__opened');
  });
}

function onClickLike() {
  const likes = document.querySelectorAll('.element__like');

  likes.forEach((like) => {
    like.addEventListener('click', () => {
      like.classList.toggle('element__like_light');
      like.classList.toggle('element__like_black');
    });
  });
}

onClickLike();
editProfile();
