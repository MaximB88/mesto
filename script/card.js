import {viewImage, openPopup, popupPhoto, popupText} from './index.js';

export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.post')
        .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector('.post__title').textContent =  this._name;
        this._element.querySelector('.post__photo').src = this._link;
      
        this._setEventListeners();
        
        return this._element;
    }

    _likeCard() {
        this._element.querySelector('.post__like-button').classList.toggle('post__like-button_active');
    }

    _removeCard() {
        this._element.remove();
    }

    _showCard () {
        openPopup(viewImage);
        popupText.textContent = this._name;
        popupPhoto.src = this._link;
      }

    _setEventListeners() {
        this._element.querySelector('.post__like-button').addEventListener('click', () => {
            this._likeCard()
        });
        this._element.querySelector('.post__delete-button').addEventListener('click', () => {
            this._removeCard()
        });
        this._element.querySelector('.post__photo').addEventListener('click', () => {
            this._showCard()
        });
    }
}