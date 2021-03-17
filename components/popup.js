export class Popup {
    constructor(popup){
        this._popup = popup;
        this._closeButton = this._popup.querySelector('.popup__close-button');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (event) => {
        if (event.key === "Escape") {
            this.close(this._popup);
        }
    }

    _handleOverlayClose = (event) => {
        if (event.target === event.currentTarget) {
            this.close(this.popup);
          }
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => {
            this.close();
        });
        this._popup.addEventListener('click', (event) => {
            this._handleOverlayClose(event);
        })
    }
}