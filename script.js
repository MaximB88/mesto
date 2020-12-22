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