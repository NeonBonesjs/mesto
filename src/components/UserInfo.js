export default class UserInfo{
  constructor({nameSelector, infoSelector, avatarSelector}){
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector)
  }

  getUserInfo(){
    const userInfo = {form__name:'', form__subname:''};
    userInfo.form__name = this._name.textContent;
    userInfo.form__subname = this._info.textContent;
    return userInfo
  }

  setUserInfo = (object) => {
    this._name.textContent = object.name;
    this._info.textContent = object.about;
  }

  setUserAvatar = (object) => {
    this._avatar.src = object.avatar
  }
}