import Popup from "./Popup.js";
export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitFunction ){
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector('.popup__forms');
    this._inputList = this._form.querySelectorAll('.popup__form');
    this._submitButton = this._form.querySelector('.popup__button-save');
    this._defaultPlaceHolder = this._submitButton.textContent;
  }
  _getInputValues = () => {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    console.log(this._formValues)
    return this._formValues; 
    
  }

  setEventListeners = () => {
    // this._popup.addEventListener('click', this._closePopupClickOverlay);
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      this._submitFunction(evt, this._getInputValues())});

  }

  close = () => {
    super.close()
    this._form.reset();
  }

  setInputValues = (object) => {
    this._inputValues = {}
    this._inputList.forEach((input) => {
      input.value = object[input.name]
    });
 
  }
  renderLoading = (isLoading) => {
    
    if(isLoading){
      this._submitButton.textContent = 'Сохранение...'
    }
    else{
      this._submitButton.textContent = 'Сохранить';
    }
  }

  
}