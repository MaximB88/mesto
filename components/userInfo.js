export class UserInfo {
    constructor({userName, userInfo}) {
        this._userName = document.querySelector(userName);
        this._userInfo = document.querySelector(userInfo);
    }

    getUserInfo() {
        this._profile = {};
        this._profile.name = this._userName.textContent;
        this._profile.info = this._userInfo.textContent;

        return this._profile;
    }

    setUserInfo(formData) {
        this._userName.textContent = formData.name;
        this._userInfo.textContent = formData.info;
    }
}

  