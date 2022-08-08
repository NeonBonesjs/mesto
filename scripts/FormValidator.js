export default class FormValidation {

  constructor(setting, formElement){
      this._formElement = formElement;
      this._formSelector = setting.formSelector;
      this._inputSelector = setting.inputSelector;
      this._submitButtonSelector = setting.submitButtonSelector;
      this._inactiveButtonClass = setting.inactiveButtonClass;
      this._inputErrorClass = setting.inputErrorClass
      this._errorClass = setting.errorClass
  }





  _getFormObject(){
      const formObject = document.querySelector(this._formElement);
      return formObject
  }

 
  _showError = (input, errorMessage) => {
      const errorElement = this._formObject.querySelector(`#${input.id}-error`);
      input.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
  }


  _hideError = (input) => {
      const errorElement = this._formObject.querySelector(`#${input.id}-error`);
      input.classList.remove(this._inputErrorClass);
      errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid){
          this._showError(inputElement, inputElement.validationMessage)
        }
        else{
          this._hideError(inputElement)
        }
  }
  _setEventLiseners () {
      this._formObject = this._getFormObject();

      const inputList = Array.from(this._formObject.querySelectorAll(this._inputSelector));
      this._buttonElement = this._formObject.querySelector(this._submitButtonSelector);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement)
          this._toggleButtonState(inputList, this._buttonElement)
        })
      })
  }

  _toggleButtonState(inputList, buttonElement) {
      if(this._hasInvalidInput(inputList)){
        buttonElement.classList.add(this._inactiveButtonClass)
        buttonElement.setAttribute('disabled', true)
      }
      else{
        buttonElement.classList.remove(this._inactiveButtonClass)
        buttonElement.removeAttribute('disabled', true)
      }
    }


  _hasInvalidInput(inputList) {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
  }

 _validateInput(){
  const inputList = Array.from(this._formObject.querySelectorAll(this._inputSelector));
      inputList.forEach((inputElement) => {
        this._checkInputValidity(inputElement)
      })
    }

  _validateForm = () => {
      const inputList = Array.from(this._formObject.querySelectorAll(this._inputSelector));

      this._toggleButtonState(inputList, this._buttonElement);
  }



  enebleValidation() {
      this._setEventLiseners();
      this._validateForm();
      this._validateInput();
  }
}