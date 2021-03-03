import {openPopup,} from './index.js';
import {viewImage, popupPhoto, popupText} from '../utils/constants.js'

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

    _getPostPhoto() {
        const selector = this._element.querySelector('.post__photo');

        return selector;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._postPhoto = this._getPostPhoto();

        this._element.querySelector('.post__title').textContent =  this._name;
        this._postPhoto.src = this._link;
        this._postPhoto.alt = this._name;
      
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
        popupPhoto.alt = this._name;
      }

    _setEventListeners() {
        this._element.querySelector('.post__like-button').addEventListener('click', () => {
            this._likeCard()
        });
        this._element.querySelector('.post__delete-button').addEventListener('click', () => {
            this._removeCard()
        });
        this._postPhoto.addEventListener('click', () => {
            this._showCard()
        })
    }
    
}