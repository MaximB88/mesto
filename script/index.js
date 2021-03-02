import {Card} from './card.js';
import {FormValidator} from './formValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const validationConfig = ({
  formSelector: '.popup__form', 
  inputSelector: '.popup__input', 
  submitButtonSelector: '.popup__save-button', 
  inactiveButtonClass: 'popup__save-buton_inactive', 
  inputErrorClass: 'popup__input_type_error', 
  errorClass: 'popup__input-error_active' 
});
const overlay = document.querySelectorAll('.popup');
const addCard = document.querySelector('.popup_type_add');
const editProfile = document.querySelector('.popup_type_edit');
export const viewImage = document.querySelector('.popup_type_show');
const cardPhoto = document.querySelector('.photo');
const addButton = document.querySelector('.profile__add-button'); 
const editButton = document.querySelector('.profile__edit-button');
const editCloseButton = document.querySelector('.popup__close-button_type_edit');
const addCloseButton = document.querySelector('.popup__close-button_type_add');
const showCloseButton = document.querySelector('.popup__close-button_type_show');
const editSaveButton = document.querySelector('.popup__save-button_type-edit');
const addSaveButton = addCard.querySelector('.popup__save-button_type_add');
const accountName = document.querySelector('.profile__account-name');
const description = document.querySelector('.profile__description');
const userForm = document.querySelector('form[name="edit-profile"]');
const postForm = document.querySelector('form[name = "add-card"]');
const userName = document.querySelector('input[name ="user-name"]');
const userInfo = document.querySelector('input[name ="user-info"]');
const postName = document.querySelector('input[name = "place-name"]');
const postPhoto = document.querySelector('input[name = "place-link"]');
export const popupPhoto = document.querySelector('.popup__photo');
export const popupText = document.querySelector('.popup__description');
const input = document.querySelectorAll('.popup__input');
const overlayArr = Array.from(overlay);
const showButton = document.querySelector('.post__photo');

export function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keydownEsc);
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keydownEsc);
}

function editProfileInfo () {
  userName.value = accountName.textContent;
  userInfo.value = description.textContent;
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  accountName.textContent = userName.value;
  description.textContent = userInfo.value;
  closePopup(document.querySelector('.popup_opened'));
}

const resetAddCardForm = (validationConfig) => {
  postForm.reset();
  addSaveButton.classList.add(validationConfig.inactiveButtonClass);
  addSaveButton.disabled = true;
}

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  const newPost = {};
  newPost.name = postName.value;
  newPost.link = postPhoto.value;
  const card = new Card(newPost, '#new-post');
  const cardElement = card.generateCard();
  cardPhoto.prepend(cardElement);
  resetAddCardForm(validationConfig);
  closePopup(document.querySelector('.popup_opened'));
}

initialCards.forEach((item) => {
  const card = new Card(item, '#new-post');
  const cardElement = card.generateCard();
  cardPhoto.append(cardElement);
})

const keydownEsc = (event) => {
  if (event.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}

editButton.addEventListener('click', function () {
  editProfileInfo();
  openPopup(editProfile);
});
addButton.addEventListener('click', function () {
  openPopup(addCard);
});
editCloseButton.addEventListener('click', function () {
  closePopup(editProfile);
});

editProfile.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopup(editProfile);
  }
});

addCloseButton.addEventListener('click', function () {
  closePopup(addCard);
});

addCard.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopup(addCard);
  }
});

showCloseButton.addEventListener('click', function () {
  closePopup(viewImage);
});

viewImage.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopup(viewImage);
  }
});

userForm.addEventListener('submit', handleProfileFormSubmit);
postForm.addEventListener('submit', handleAddFormSubmit);

const validatePopupEdit = new FormValidator(validationConfig, editProfile);
validatePopupEdit.enableValidation();

const validatePopupAdd = new FormValidator(validationConfig, addCard);
validatePopupAdd.enableValidation();