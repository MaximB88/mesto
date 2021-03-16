import {Popup} from './popup.js'; 

export class PopupWithForm extends Popup {
    constructor(popup, {handleFormSubmit}) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._element = document.querySelector('form[name = "add-card"]');
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

    close() {
        super.close();
        this._element.reset();
    }
}