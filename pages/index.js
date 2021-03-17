import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';

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
const nameInput = document.querySelector('#name-input');
const infoInput = document.querySelector('#info-input');

const createCard = (formData) => {
  return new Card(
    formData,
    '#new-post', 
    {handleCardClick: (data) => {
      popupWithImage.open(data);;
    }}).generateCard();
}

const newCards = new Section({
  data: initialCards, 
  renderer: (data) => {
    const cards = createCard(data)
    newCards.addItem(cards);
    },
  },
  cardPhoto
);

newCards.renderItems();

const popupWithImage = new PopupWithImage(popupShowCard);
popupWithImage.setEventListeners();

const popupWithAddForm = new PopupWithForm(
  popupAddCard,
  {handleFormSubmit: (formData) => {
    const card = createCard(formData);
  newCards.addItem(card);
  popupWithAddForm.close();
}});

popupWithAddForm.setEventListeners();


const popupWithEditForm = new PopupWithForm(
  popupEditProfile,
  {handleFormSubmit: (data) => {
    profile.setUserInfo(data);
    popupWithEditForm.close();
  }});

popupWithEditForm.setEventListeners();

const profile = new UserInfo({
  userName: '.profile__account-name',
  userInfo: '.profile__description'
});


editButton.addEventListener('click', () => {
  validatePopupEdit.clearValidation(userForm);
  const inputValues = profile.getUserInfo();
  nameInput.value = inputValues.name;
  infoInput.value = inputValues.info;
  popupWithEditForm.open();
});
addButton.addEventListener('click', () => {
  validatePopupAdd.clearValidation(postForm);
  popupWithAddForm.open();
});

const validatePopupEdit = new FormValidator(validationConfig, userForm);
validatePopupEdit.enableValidation();

const validatePopupAdd = new FormValidator(validationConfig, postForm);
validatePopupAdd.enableValidation();