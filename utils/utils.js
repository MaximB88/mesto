export function openPopup (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', keydownEsc);
  }

export const keydownEsc = (event) => {
    if (event.key === "Escape") {
      closePopup(document.querySelector('.popup_opened'));
    }
  }

export function closePopup (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', keydownEsc);
  }