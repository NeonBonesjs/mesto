export default class UserInfo{
  constructor({nameSelector, infoSelector}){
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
  }

  getUserInfo(){
    const userInfo = {name:'', info:''};
    userInfo.name = this._name.textContent;
    userInfo.info = this._info.textContent;
    return userInfo
  }

  setUserInfo = (object) => {
    this._name.textContent = object.input1;
    this._info.textContent = object.input2;
  }
}