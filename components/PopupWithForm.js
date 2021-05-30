import {Popup} from './popup.js'; 

export class PopupWithForm extends Popup {
    constructor(popup, {handleFormSubmit}) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._element = this._popup.querySelector('form');
        this._button = this._popup.querySelector('.popup__save-button');
        this._buttonDefaultText = this._button.textContent;
        this._inputList = this._popup.querySelectorAll('.popup__input');
    }
    
    _getInputValues() {
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

    renderLoading(data, loadingText = 'Загрузка...') {
        this._button.textContent = data ? loadingText : this._buttonDefaultText;
    }

    setSubmitHandler(data) {
        this._handleFormSubmit = data;
    }

    close() {
        super.close();
        this._element.reset();
    }
}