import {Popup} from './popup.js'; 

export class PopupWithForm extends Popup {
    constructor(popup, {handleFormSubmit}) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._element = this._popup.querySelector('form');
        this._button = this._popup.querySelector('.popup__save-button');
        this._buttonDefaultText = this._button.textContent;
    }
    
    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._formValues = {};

        this._inputList.forEach(input  => {
            this._formValues[input.name] = input.value
            
        });
        return this._formValues;
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    }

    loading(data) {
        this._button.textContent = data ? 'Загрузка...' : this._buttonDefaultText;
    }

    close() {
        super.close();
        this._element.reset();
    }
}