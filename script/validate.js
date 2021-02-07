const showInputError = (formElement, inputElement, selectors, errorMessage,) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
}
  
const hideInputError = (formElement, inputElement, selectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent = '';
}
  
const checkInputValidity = (formElement, inputElement, selectors) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, selectors, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement, selectors);
    }
}
  
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
}
  
const toggleButtonState = (inputList, buttonElement, selectors) => {
    console.log(hasInvalidInput(inputList));
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(selectors.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(selectors.inactiveButtonClass);
      buttonElement.disabled = false;
    }
}
  
const setEventListeners = (formElement, selectors) => {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, selectors);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, selectors);
        toggleButtonState(inputList, buttonElement, selectors);
      });
    });
}
  
const enableValidation = (selectors) => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
    setEventListeners(formElement, selectors);
    });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-buton_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});