export class Api {
    
    getUserInfo() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-24/users/me', {
            method: 'GET',
            headers: {
                authorization: '5e66f5ac-1df2-4094-a14c-2395e9e314f5',
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            })
            .catch(err => Promise.reject(err));
    }

    getCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-24/cards', {
            method: 'GET',
            headers: {
                authorization: '5e66f5ac-1df2-4094-a14c-2395e9e314f5',
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            })
            .catch(err => Promise.reject(err));
    }

    setUserInfo(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-24/users/me', {
            method: 'PATCH',
            headers: {
                authorization: '5e66f5ac-1df2-4094-a14c-2395e9e314f5',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(res => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            })
            .catch(err => Promise.reject(err));
    }

    setUserAvatar(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-24/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: '5e66f5ac-1df2-4094-a14c-2395e9e314f5',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.link
            })
        })
            .then(res => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            })
            .catch(err => Promise.reject(err));
    }

    setNewCard(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-24/cards', {
            method: 'POST',
            headers: {
                authorization: '5e66f5ac-1df2-4094-a14c-2395e9e314f5',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            })
            .catch(err => Promise.reject(err));
    }

    deleteCard(cardId) {
       return fetch(`https://mesto.nomoreparties.co/v1/cohort-24/cards/${cardId}`, {
           method: 'DELETE',
           headers: {
                authorization: '5e66f5ac-1df2-4094-a14c-2395e9e314f5',
                'Content-Type': 'application/json'
           }
       })
            .then(res => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            })
            .catch(err => Promise.reject(err));
    }

    changeLikeCount(cardId, data) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-24/cards/likes/${cardId}`, {
            method: data ? 'PUT' : 'DELETE',
            headers: {
                authorization: '5e66f5ac-1df2-4094-a14c-2395e9e314f5',
                'Content-Type': 'application/json'
           }
        })
            .then(res => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            })
            .catch(err => Promise.reject(err));
    }

}

