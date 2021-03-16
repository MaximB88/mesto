export class UserInfo {
    constructor({userName, userInfo}) {
        this._userName = userName;
        this._userInfo = userInfo;
        this._inputName = document.querySelector('#name-input');
        this._inputInfo = document.querySelector('#info-input');
    }

    getUserInfo() {
        this._inputName.value = this._userName.textContent;
        this._inputInfo.value = this._userInfo.textContent;
    }

    setUserInfo() {
        this._userName.textContent = this._inputName.value;
        this._userInfo.textContent = this._inputInfo.value
    }
}

  