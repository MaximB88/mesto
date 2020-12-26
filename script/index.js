const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const userName = document.querySelector('input[name ="user-name"]');
const accountName = document.querySelector('.profile__account_name');
const userInfo = document.querySelector('input[name ="user-info"]');
const description = document.querySelector('.profile__description');
const form = document.querySelector('.popup__container');

function openPopup () {
    function getUserName() {
        userName.value = accountName.textContent;
    }
    function getDescription () {
        userInfo.value = description.textContent;
    }
    getUserName();
    getDescription()
    popup.classList.add('popup_opened');
} 

function closePopup () {
    popup.classList.remove('popup_opened');
} 

function handleFormSubmitOne (evt) {
    evt.preventDefault();
    accountName.textContent = userName.value;
    description.textContent = userInfo.value;
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', handleFormSubmitOne);