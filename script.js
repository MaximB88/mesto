let popup = document.querySelector('.popup');
let editButton = document.querySelector('.button__edit');

function openPopup () {
    popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', openPopup);

let closeButton = document.querySelector('.button_close');

function closePopup () {
    popup.classList.toggle('popup_opened');
}

closeButton.addEventListener('click', closePopup);