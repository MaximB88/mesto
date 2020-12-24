const popup = document.querySelector('.popup');
const editButton = document.querySelector('.button_edit');

function openPopup () {
    popup.classList.add('popup_opened');
}

editButton.addEventListener('click', openPopup);
const closeButton = document.querySelector('.button_close');

function closePopup () {
    popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);
const saveButton = document.querySelector('.button_save');
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

function handleFormSubmit (evt) {
    evt.preventDefault();
    const nameInput = userName.value;
    const infoInput = userInfo.value;
    accountName.textContent = nameInput;
    description.textContent = infoInput;
    popup.classList.remove('popup_opened');
}

saveButton.addEventListener('click', handleFormSubmit);