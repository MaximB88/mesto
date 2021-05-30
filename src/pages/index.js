import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';
import {apiConfig, headers, validationConfig} from '../utils/constants.js';

const popupAddCard = document.querySelector('.popup_type_add');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditAvatar = document.querySelector('.popup_type_change-avatar');
const popupShowCard = document.querySelector('.popup_type_show');
const popupAccept = document.querySelector('.popup_type_accept');
const cardPhoto = document.querySelector('.photo');
const addButton = document.querySelector('.profile__add-button'); 
const editButton = document.querySelector('.profile__edit-button');
const editAvatarButton = document.querySelector('.profile__avatar');
const userForm = document.querySelector('form[name="edit-profile"]');
const postForm = document.querySelector('form[name = "add-card"]');
const avatarForm = document.querySelector('form[name = "change-avatar"]');
const nameInput = document.querySelector('#name-input');
const infoInput = document.querySelector('#info-input');
let userId = null;

const api = new Api(apiConfig, headers);

const createCard = (formData) => {
  return new Card(
    {data : { ...formData, currentUserId: userId}},
    '#new-post', 
    {handleCardClick: (data) => {
      popupWithImage.open(data);
    },
    handleLikeClick: (card) => {
      api.changeLikeCount(card.id(), !card.isLiked())
        .then(data => {
          card.setLikes({ ...data });
        })
        .catch(err => console.log(`Ошибка постановки лайка: ${err}`));
    },
    handleDeleteIconClick: (card) => {
      popupWithAccept.setSubmitHandler(() => {
        popupWithAccept.renderLoading(true, 'Удаление...')
        api.deleteCard(card.id())
        .then(() => {
          card.deleteCard();
          popupWithAccept.close();
        })
        .catch(err => console.log(`Ошибка удаления карточки: ${err}`))
        .finally(() => popupWithAccept.renderLoading(false));
      })
      popupWithAccept.open();
    }
  }).generateCard();
}

const newCards = new Section({
  renderer: (data) => {
    newCards.addItem(createCard(data));
    },
  },
  cardPhoto
);

const popupWithImage = new PopupWithImage(popupShowCard);
popupWithImage.setEventListeners();

const popupWithAccept = new PopupWithForm(
  popupAccept, {
    handleFormSubmit: () => {}
  });
popupWithAccept.setEventListeners();

const popupWithAddForm = new PopupWithForm(
  popupAddCard,
  {handleFormSubmit: (formData) => {
    popupWithAddForm.renderLoading(true)
    api.setNewCard(formData)
      .then(formData => {
        newCards.addItem(createCard(formData));
        popupWithAddForm.close();
      })
      .catch(err => console.log(`Ошибка добавление карточки: ${err}`))
      .finally(() => popupWithAddForm.renderLoading(false));
  
}});

popupWithAddForm.setEventListeners();

const popupWithAvatar = new PopupWithForm(
  popupEditAvatar,
  {handleFormSubmit: (data) => {
    popupWithAvatar.renderLoading(true)
    api.setUserAvatar(data)
      .then(formData => {
        profile.setUserInfo({
          userName: formData.name,
          userInfo: formData.about,
          userAvatar: formData.avatar});
        popupWithAvatar.close();
      })
      .catch(err => console.log(`Ошибка обновления аватара: ${err}`))
      .finally(() => popupWithAvatar.renderLoading(false));
      
  }}
)

popupWithAvatar.setEventListeners();

const popupWithEditForm = new PopupWithForm(
  popupEditProfile,
  {handleFormSubmit: (data) => {
    popupWithEditForm.renderLoading(true);
    api.setUserInfo(data)
      .then(data => {
        profile.setUserInfo({
          userName: data.name,
          userInfo: data.about,
          userAvatar: data.avatar});
        popupWithEditForm.close();
      })
      .catch(err => console.log(`Ошибка обновления информации пользователя: ${err}`))
      .finally(() => popupWithEditForm.renderLoading(false));
  }});

popupWithEditForm.setEventListeners();

const profile = new UserInfo({
  userName: '.profile__account-name',
  userInfo: '.profile__description',
  userAvatar: '.profile__avatar'
});

editButton.addEventListener('click', () => {
  validatePopupEdit.clearValidation();
  const inputValues = profile.getUserInfo();
  nameInput.value = inputValues.name;
  infoInput.value = inputValues.about;
  popupWithEditForm.open();
});

addButton.addEventListener('click', () => {
  validatePopupAdd.clearValidation();
  popupWithAddForm.open();
});

editAvatarButton.addEventListener('click', () => {
  validatePopupAvatar.clearValidation();
  popupWithAvatar.open();
})

const validatePopupEdit = new FormValidator(validationConfig, userForm);
validatePopupEdit.enableValidation();

const validatePopupAdd = new FormValidator(validationConfig, postForm);
validatePopupAdd.enableValidation();

const validatePopupAvatar = new FormValidator(validationConfig, avatarForm);
validatePopupAvatar.enableValidation();

Promise.all([api.getCards(), api.getUserInfo()])
  .then(([data, userData]) => {
    userId = userData._id;
    profile.setUserInfo({
      userName: userData.name,
      userInfo: userData.about,
      userAvatar: userData.avatar});
    newCards.renderItems(data)
  })
  .catch(err => console.log(`Ошибка: ${err}`))