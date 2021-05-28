export class UserInfo {
    constructor({userName, userInfo, userAvatar}) {
        this._userName = document.querySelector(userName);
        this._userInfo = document.querySelector(userInfo);
        this._userAvatar = document.querySelector(userAvatar);
    }

    getUserInfo() {
        this._profile = {};
        this._profile.name = this._userName.textContent;
        this._profile.about = this._userInfo.textContent;

        return this._profile;
    }

    setUserInfo({userName, userInfo, userAvatar}) {
        this._userName.textContent = userName;
        this._userInfo.textContent = userInfo;
        this._userAvatar.src = userAvatar;
    }
}

  