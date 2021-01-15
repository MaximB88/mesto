const popup = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup-add');
const photo = document.querySelector('.photo');
const addButton = document.querySelector('.profile__add-button');
const addCloseButton = document.querySelector('.popup-add__close-button');
const likeButton = document.querySelector('.post__like-button');
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
const addNewPost = document.querySelector('#new-post').content;

function openPopup () {
    userName.value = accountName.textContent;
    userInfo.value = description.textContent;
    popup.classList.add('popup_opened');
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
  const newPost = addNewPost.cloneNode(true);
  newPost.querySelector('.post__photo').src = postPhoto.value;
  newPost.querySelector('.post__title').textContent = postName.value;
  photo.prepend(newPost);
  popupAdd.classList.remove('popup-add_opened');
}

function like (evt) {
  likeButton.classList.toggle('post__like-button_active');
}

like();

editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openAddPopup);
/*likeButton.addEventListener('click', function (evt) {
  evt.target.classList.toggle('post__like-button_active');
  likeButton.forEach(function (item) {
    console.log(item);
  });
});*/
editCloseButton.addEventListener('click', closePopup);
addCloseButton.addEventListener('click', closeAddPopup);
userForm.addEventListener('submit', handleFormSubmit);
postForm.addEventListener('submit', handleAddFormSubmit);