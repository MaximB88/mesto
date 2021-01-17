const popup = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup-add');
const photo = document.querySelector('.photo');
const addButton = document.querySelector('.profile__add-button');
const addCloseButton = document.querySelector('.popup-add__close-button');
const editButton = document.querySelector('.profile__edit-button');
const editCloseButton = document.querySelector('.popup__close-button');
const userName = document.querySelector('input[name ="user-name"]');
const accountName = document.querySelector('.profile__account-name');
const userInfo = document.querySelector('input[name ="user-info"]');
const description = document.querySelector('.profile__description');
const userForm = document.querySelector('.popup__container');
const postForm = document.querySelector('.popup-add__container');
const postName = document.querySelector('input[name = "place-name"]');
const postPhoto = document.querySelector('input[name = "place-link"]');
const itemTemplate = document.querySelector('#new-post').content;
const popupView = document.querySelector('.popup-view');
const viewCloseButton = document.querySelector('.popup-view__close-button');
const viewOpenButton = document.querySelector('.post__photo');
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

initialCards.forEach(function (el) {
  const cardElement = itemTemplate.cloneNode(true);
  const popup = document.querySelector('.popup-view');
  
  cardElement.querySelector('.post__title').textContent = el.name;
  cardElement.querySelector('.post__photo').src = el.link;
  cardElement.querySelector('.post__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('post__like-button_active');
  });
  cardElement.querySelector('.post__delete-button').addEventListener('click', function (evt) {
    evt.target.closest('.post').remove();
  })
  cardElement.querySelector('.post__photo').addEventListener('click', function (evt) {
    popup.classList.add('popup-view_opened');
    const popupPhoto = document.querySelector('.popup-view__photo');
    const popupText = document.querySelector('.popup-view__description');
    popupText.textContent = el.name;
    popupPhoto.src = el.link;
  })
  photo.appendChild(cardElement);
});

function openPopup () {
    userName.value = accountName.textContent;
    userInfo.value = description.textContent;
    popup.classList.add('popup_opened');
} 

function closeViewPopup () {
  popupView.classList.remove('popup-view_opened');
}

function openAddPopup () {
    popupAdd.classList.add('popup-add_opened');
}

function closePopup () {
    popup.classList.remove('popup_opened');
} 

function closeAddPopup () {
    popupAdd.classList.remove('popup-add_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    accountName.textContent = userName.value;
    description.textContent = userInfo.value;
    popup.classList.remove('popup_opened');
}

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  const newPost = itemTemplate.cloneNode(true);
  newPost.querySelector('.post__photo').src = postPhoto.value;
  newPost.querySelector('.post__title').textContent = postName.value;
  photo.prepend(newPost);
  popupAdd.classList.remove('popup-add_opened');
}

editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openAddPopup);
editCloseButton.addEventListener('click', closePopup);
addCloseButton.addEventListener('click', closeAddPopup);
viewCloseButton.addEventListener('click', closeViewPopup);
userForm.addEventListener('submit', handleFormSubmit);
postForm.addEventListener('submit', handleAddFormSubmit);