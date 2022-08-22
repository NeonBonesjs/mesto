export default class UserInfo{
  constructor({nameSelector, infoSelector}){
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
  }

  getUserInfo(){
    const userInfo = {form__name:'', form__subname:''};
    userInfo.form__name = this._name.textContent;
    userInfo.form__subname = this._info.textContent;
    return userInfo
  }

  setUserInfo = (object) => {
    this._name.textContent = object.form__name;
    this._info.textContent = object.form__subname;
  }
}