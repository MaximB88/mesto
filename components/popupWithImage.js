import {Popup} from './popup.js';

export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._image = this._popup.querySelector('.post__photo');
        this._text = this._popup.querySelector('.post__title');
    }
    
    
    open(data) {
        this._popup.querySelector('.popup__photo').src = data.src;
        this._popup.querySelector('.popup__photo').alt = data.alt;
        this._popup.querySelector('.popup__description').textContent = data.alt;
        
        super.open();
    }
}