export class Card {

    constructor({data}, cardSelector, {handleCardClick, handleLikeClick, handleDeleteIconClick }) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._ownerId = data.owner._id;
        this._userId = data.currentUserId;
        this._cardId = data._id
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
    } 

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.post')
        .cloneNode(true);

        return cardElement;
    }

    _getPostPhoto() {
        const photo = this._element.querySelector('.post__photo');

        return photo;
    }

    _changeLikeButtonState() {
        this._element.querySelector('.post__likes-count').textContent = this._likes.length;
        
        if (this.isLiked()) {
            this._element.querySelector('.post__like-button').classList.add('post__like-button_active');
        } else {
            this._element.querySelector('.post__like-button').classList.remove('post__like-button_active');
        }
    }

    setLikes(data) {
        this._likes = data.likes;
        this._changeLikeButtonState();
    }

    generateCard() {
        this._element = this._getTemplate();
        this._postPhoto = this._getPostPhoto();
        this._changeLikeButtonState();

        this._element.querySelector('.post__title').textContent =  this._name;
        
        this._postPhoto.src = this._link;
        this._postPhoto.alt = this._name;
      
        if(this._userId === this._ownerId) {
            this._element.querySelector('.post__delete-button').classList.add('post__delete-button_active');
        }else {
            this._element.querySelector('.post__delete-button').classList.remove('post__delete-button_active');
        }
        

        this._setEventListeners();
        
        return this._element;
    }

    isLiked() {
        return Boolean(this._likes.find(item => item._id === this._userId));
    }
    
    id() {
        return this._cardId;
    }

    deleteCard() {
        this._element.remove();
        this._element = null; 
    }

    _setEventListeners() {
        this._element.querySelector('.post__like-button').addEventListener('click', () => {
            this._handleLikeClick(this);
        });
        this._element.querySelector('.post__delete-button').addEventListener('click', () => {
            this._handleDeleteIconClick(this);
        });
        this._postPhoto.addEventListener('click', () => {
            this._handleCardClick(this._postPhoto)
        })
    }
}