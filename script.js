const popup = document.querySelector('.popup');
const editButton = document.querySelector('.button__edit');

function openPopup () {
    popup.classList.add('popup_opened');
}

editButton.addEventListener('click', openPopup);
const closeButton = document.querySelector('.button__close');

function closePopup () {
    popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);
const saveButton = document.querySelector('.button__save');
const userName = document.querySelector('.user-name');
const accountName = document.querySelector('.account__name');

function getUserName() {
    userName.value = accountName.textContent;
}

getUserName();
const userInfo = document.querySelector('.user-info');
const description = document.querySelector('.description');
function getDescription () {
    userInfo.value = description.textContent;
}

getDescription();