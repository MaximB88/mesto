import {PopupWithForm} from './PopupWithForm.js';

export class PopupWithAccept extends PopupWithForm {

    setSubmitAccept(data) {
        this._handleFormSubmit = data;
      }
}