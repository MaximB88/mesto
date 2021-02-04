/*const formElement = document.querySelector('.popup__container');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector(`.${formInput.id}-error`);*/

const showInputError = (formSelector, inputSelector, errorMessage, selectors) => {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
  }
  
const hideInputError = (formSelector, inputSelector, selectors) => { 
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent = '';
}
  
const isValid = (formSelector, inputSelector) => { 
    if (!inputSelector.validity.valid) {
      showInputError(formSelector, inputSelector, inputSelector.validationMessage);
    } else {
      hideInputError(formSelector, inputSelector);
    }
}
  
const hasInvalidInput = (inputList) => { 
    return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
}
  
const toggleButtonState = (inputList, submitButtonSelector, selectors) => {
    if (!hasInvalidInput(inputList)) {
      submitButtonSelector.classList.add(selectors.inactiveButtonClass);
    } else {
      submitButtonSelector.classList.remove(selectors.inactiveButtonClass);
    }
}
  
const setEventListeners = (formSelector, selectors) => {
    const inputList = Array.from(formSelector.querySelectorAll(selectors.inputSelector));
    const buttonElement = formSelector.querySelector(selectors.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {
        isValid(formSelector, inputSelector)
        toggleButtonState(inputList, buttonElement);
      });
    });
}
  
const enableValidation = (selectors) => {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formSelector) => {
      formSelector.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formSelector);
    });
  }

  enableValidation({
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: '.popup__save-buton_inactive',
    inputErrorClass: '.popup__input-error',
    errorClass: '.popup__input-error_active'
  });