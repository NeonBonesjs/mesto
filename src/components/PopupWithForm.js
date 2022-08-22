import Popup from "./Popup.js";
export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitFunction , fillInputFunction){
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._fillInputFunction = fillInputFunction;
    this._form = this._popup.querySelector('.popup__forms');
    this._inputList = this._form.querySelectorAll('.popup__form');
  }
  _getInputValues = () => {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues; 
    
  }

  setEventListeners = () => {
    this._popup.addEventListener('click', this._closePopupClickOverlay);

    this._form.addEventListener('submit', (evt) => {this._submitFunction(evt, this._getInputValues())});

  }

  close = () => {
    this._popup.classList.remove("popup_active");
    document.removeEventListener('keydown', this._handleEscClose);
    this._form.reset();
  }

  _setInputValues = (object) => {
    this._inputValues = {}
    this._inputList.forEach((input) => {
      input.value = object[input.name]
    });
 
  }


  fillInput = () => {
    this._setInputValues(this._fillInputFunction())
  }
}