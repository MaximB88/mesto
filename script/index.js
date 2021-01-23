const addCard = document.querySelector('.popup_type_add');
const editProfile = document.querySelector('.popup_type_edit');
const viewImage = document.querySelector('.popup_type_show');
const cardPhoto = document.querySelector('.photo');
const addButton = document.querySelector('.profile__add-button'); 
const editButton = document.querySelector('.profile__edit-button');
const likeButton = document.querySelector('.post__like-button');
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
const itemTemplate = document.querySelector('#new-post').content;
const popupPhoto = document.querySelector('.popup__photo');
const popupText = document.querySelector('.popup__description');


function openPopup (evt, target) {
  if (evt.target === editButton) {
    editProfileInfo();
    editProfile.classList.add('popup_opened');
  } else if (evt.target === addButton){
    addCard.classList.add('popup_opened');
  } else {
    viewImage.classList.add('popup_opened');
  }
}

function closePopup (evt, target) {
  if (evt.target === editCloseButton || evt.target === editSaveButton) {
    editProfile.classList.remove('popup_opened');
  }else if (evt.target === addCloseButton || evt.target === addSaveButton) {
    addCard.classList.remove('popup_opened');
  }else if (evt.target === showCloseButton) { 
    viewImage.classList.remove('popup_opened');
  }
}

function editProfileInfo () {
  userName.value = accountName.textContent;
  userInfo.value = description.textContent;
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  accountName.textContent = userName.value;
  description.textContent = userInfo.value;
}

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  const newPost = {};
  newPost.name = postName.value
  newPost.link = postPhoto.value
  renderCard(newPost);
}

function getCard (data) {
  const cardElement = itemTemplate.cloneNode(true);
  cardElement.querySelector('.post__title').textContent = data.name;
  cardElement.querySelector('.post__photo').src = data.link;
  cardElement.querySelector('.post__like-button').addEventListener('click', likeCard);
  cardElement.querySelector('.post__delete-button').addEventListener('click', removeCard);
  cardElement.querySelector('.post__photo').addEventListener('click', showCard);
  return cardElement;
}

function renderCard(data) {
  cardPhoto.prepend(getCard(data));
}

function removeCard (evt) {
  evt.target.closest('.post').remove();
}

function showCard (evt) {
  openPopup(evt);
  const post = evt.target.closest('.post');
  popupText.textContent = post.querySelector('.post__title').textContent;
  popupPhoto.src = evt.target.src;
}

function likeCard (evt) {
  evt.target.classList.toggle('post__like-button_active');
}

initialCards.forEach(function(data) {
  renderCard(data);
});

editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openPopup);
cardPhoto.addEventListener('click', openPopup);
editCloseButton.addEventListener('click', closePopup);
addCloseButton.addEventListener('click', closePopup);
showCloseButton.addEventListener('click', closePopup);
editSaveButton.addEventListener('click', closePopup);
addSaveButton.addEventListener('click', closePopup);
userForm.addEventListener('submit', handleFormSubmit);
postForm.addEventListener('submit', handleAddFormSubmit);