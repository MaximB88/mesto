import {Popup} from './popup.js';

export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._image = this._popup.querySelector('.popup__photo');
        this._text = this._popup.querySelector('.popup__description');
    }
    
    
    open(data) {
        this._image.src = data.src;
        this._image.alt = data.alt;
        this._text.textContent = data.alt;
        
        super.open();
    }
}