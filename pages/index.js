import './index.css';
import {Card} from '../components/card.js';
import {FormValidator} from '../components/formValidator.js';
import { Section } from '../components/section.js';
import { PopupWithImage } from '../components/popupWithImage.js';
import { PopupWithForm } from '../components/popupWithForm.js';
import {UserInfo} from '../components/userInfo.js';

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
const popupShowCard = document.querySelector('.popup_type_show');
const cardPhoto = document.querySelector('.photo');
const addButton = document.querySelector('.profile__add-button'); 
const editButton = document.querySelector('.profile__edit-button');
const userForm = document.querySelector('form[name="edit-profile"]');
const postForm = document.querySelector('form[name = "add-card"]');

const newCards = new Section({
  data: initialCards, 
  renderer: (data) => {
    const card = new Card(
      data,
      '#new-post', 
      {handleCardClick: () => {
        handleOpenShowPopup();
      }});
    const cardElement = card.generateCard();
    newCards.addItem(cardElement);
    },
  },
  cardPhoto
);

newCards.renderItems();

const handleOpenShowPopup = () => {
  const popupWithImage = new PopupWithImage(popupShowCard);
  popupWithImage.open();
  popupWithImage.setEventListeners();
}

const popupWithAddForm = new PopupWithForm(
  popupAddCard,
  {handleFormSubmit: (formData) => {
    const card = new Card(
      formData,
      '#new-post', 
      {handleCardClick: () => {
        handleOpenShowPopup();
      }});
  const cardElement = card.generateCard();
  newCards.addItem(cardElement);
  popupWithAddForm.close();
}});

const popupWithEditForm = new PopupWithForm(
  popupEditProfile,
  {handleFormSubmit: () => {
    profile.setUserInfo();
    popupWithEditForm.close();
  }});

const profile = new UserInfo({
  userName: document.querySelector('.profile__account-name'),
  userInfo: document.querySelector('.profile__description')
});


editButton.addEventListener('click', () => {
  validatePopupEdit.clearValidation(userForm);
  profile.getUserInfo();
  popupWithEditForm.open();
  popupWithEditForm.setEventListeners()
});
addButton.addEventListener('click', () => {
  validatePopupAdd.clearValidation(postForm);
  popupWithAddForm.open();
  popupWithAddForm.setEventListeners();
});

const validatePopupEdit = new FormValidator(validationConfig, userForm);
validatePopupEdit.enableValidation();

const validatePopupAdd = new FormValidator(validationConfig, postForm);
validatePopupAdd.enableValidation();