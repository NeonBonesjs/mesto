import Popup from "./Popup.js";
export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitFunction , fillInputFunction){
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._fillInputFunction = fillInputFunction;
  }
  _getInputValues = () => {
    const inputValues = {input1: '', input2: ''};
    inputValues.input1 = this._input1.value;
    inputValues.input2 = this._input2.value;
    return inputValues
  }

  setEventListeners = () => {
    this._popup.addEventListener('click', this._closePopupClickOverlay);

    this._form = this._popup.querySelector('.popup__forms');
    this._input1 = this._form.querySelector('.popup__form_type_name');
    this._input2 = this._form.querySelector('.popup__form_type_subname');
    console.log(this._submitFunction)
    this._form.addEventListener('submit', this._submitFunction);

  }

  close = () => {
    this._popup.classList.remove("popup_active");
    document.removeEventListener('keydown', this._handleEscClose);
    this._form.reset();
  }

  _autoInput = (object) => {
    
    this._input1.value = object.name;
    this._input2.value = object.info;
  }


  open = () => {
    this._popup.classList.add("popup_active");
    document.addEventListener('keydown', this._handleEscClose);
    // this._autoInput(this._fillInputFunction())
  }

  fillInput = () => {
    this._autoInput(this._fillInputFunction())
  }
}