import {Card} from './card.js';
import {FormValidator} from './formValidator.js';
import {popupPhoto, viewImage} from '../utils/constants.js';
import {openPopup, closePopup} from '../utils/utils.js';

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
const popupAddCard = document.querySelector('.popup_type_add');
const popupEditProfile = document.querySelector('.popup_type_edit');
const cardPhoto = document.querySelector('.photo');
const addButton = document.querySelector('.profile__add-button'); 
const editButton = document.querySelector('.profile__edit-button');
const editCloseButton = document.querySelector('.popup__close-button_type_edit');
const addCloseButton = document.querySelector('.popup__close-button_type_add');
const showCloseButton = document.querySelector('.popup__close-button_type_show');
const addSaveButton = popupAddCard.querySelector('.popup__save-button_type_add');
const accountName = document.querySelector('.profile__account-name');
const description = document.querySelector('.profile__description');
const userForm = document.querySelector('form[name="edit-profile"]');
const postForm = document.querySelector('form[name = "add-card"]');
const userName = document.querySelector('input[name ="user-name"]');
const userInfo = document.querySelector('input[name ="user-info"]');
const postName = document.querySelector('input[name = "place-name"]');
const postPhoto = document.querySelector('input[name = "place-link"]');

function editProfileInfo () {
  userName.value = accountName.textContent;
  userInfo.value = description.textContent;
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  accountName.textContent = userName.value;
  description.textContent = userInfo.value;
  closePopup(popupEditProfile);
}

const resetAddCardForm = (validationConfig) => {
  postForm.reset();
  addSaveButton.classList.add(validationConfig.inactiveButtonClass);
  addSaveButton.disabled = true;
}

function createCard (newPost) {
  const card = new Card(newPost, '#new-post');
  const cardElement = card.generateCard();

  return cardElement;
}

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  const newPost = {};
  newPost.name = postName.value;
  newPost.link = postPhoto.value;
  const post = createCard(newPost);
  cardPhoto.prepend(post);
  resetAddCardForm(validationConfig);
  closePopup(popupAddCard);
}

initialCards.forEach((newPost) => {
  const post = createCard(newPost);
  cardPhoto.prepend(post);
});

const closeByOverlay = (event, popup) => {
  if (event.target === event.currentTarget) {
    closePopup(popup);
  }
}

editButton.addEventListener('click', function () {
  editProfileInfo();
  validatePopupEdit.clearValidation(userForm);
  openPopup(popupEditProfile);
});
addButton.addEventListener('click', function () {
  resetAddCardForm(validationConfig);
  validatePopupAdd.clearValidation(postForm);
  openPopup(popupAddCard);
});
editCloseButton.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

popupEditProfile.addEventListener('click', function (event) {
  closeByOverlay(event, popupEditProfile);
});

addCloseButton.addEventListener('click', function () {
  closePopup(popupAddCard);
});

popupAddCard.addEventListener('click', function (event) {
  closeByOverlay(event, popupAddCard);
});

showCloseButton.addEventListener('click', function () {
  closePopup(viewImage);
});

viewImage.addEventListener('click', function (event) {
  closeByOverlay(event, viewImage);
});

userForm.addEventListener('submit', handleProfileFormSubmit);
postForm.addEventListener('submit', handleAddFormSubmit);

const validatePopupEdit = new FormValidator(validationConfig, userForm);
validatePopupEdit.enableValidation();

const validatePopupAdd = new FormValidator(validationConfig, postForm);
validatePopupAdd.enableValidation();