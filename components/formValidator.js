export class FormValidator {
    constructor(formConfig, form) {
        this._formSelector = formConfig.formSelector;
        this._inputSelector = formConfig.inputSelector;
        this._submitButtonSelector = formConfig.submitButtonSelector;
        this._inactiveButtonClass = formConfig.inactiveButtonClass;
        this._inputErrorClass = formConfig.inputErrorClass;
        this._errorClass = formConfig.errorClass
        this._form = form;
        this._submitButton = this._form.querySelector(this._submitButtonSelector);
    }
 
    _showInputError = (inputElement, errorMessage,) => {
      const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add( this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add( this._errorClass);
    }
        
    _hideInputError = (inputElement) => {
      const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove( this._inputErrorClass);
      errorElement.classList.remove( this._errorClass);
      errorElement.textContent = '';
    }
        
    _checkInputValidity = (inputElement) => {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    }
        
    _hasInvalidInput = (inputList) => {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    }
        
    _toggleButtonState = (inputList, buttonElement) => {
      if ( this._hasInvalidInput(inputList)) {
        buttonElement.classList.add( this._inactiveButtonClass);
        buttonElement.disabled = true;
      } else {
        buttonElement.classList.remove( this._inactiveButtonClass);
        buttonElement.disabled = false;
      }
    }
        
    _setEventListeners = () => {
      const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
      this._toggleButtonState(inputList, this._submitButton);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(inputList, this._submitButton);
        });
      });
    }
     
    enableValidation = () => {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    }

    clearValidation() {
      const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
      inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
        this._submitButton.disabled = true;
      });
    }
}