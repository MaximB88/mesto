import {Popup} from './popup.js';

export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._image = document.querySelector('.post__photo');
        this._text = document.querySelector('.post__title');
    }
    
    
    open() {
        this._popup.querySelector('.popup__photo').src = this._image.src;
        this._popup.querySelector('.popup__photo').alt = this._text.textContent;
        this._popup.querySelector('.popup__description').textContent = this._text.textContent;
        console.log(this._text);
        super.open();
        super.setEventListeners();
    }
}