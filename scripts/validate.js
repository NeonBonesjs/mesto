// const setting = {formSelector: '.popup__forms',
// inputSelector: '.popup__form',
// submitButtonSelector: '.popup__button-save',
// inactiveButtonClass: 'popup__button-save_invalid',
// inputErrorClass: 'popup__form_error',
// errorClass: 'popup__error'}

// function enableValidation(setting) {
//   const forms = Array.from(document.querySelectorAll(setting.formSelector))
//   forms.forEach(setEventListenerForm)
// }

// //функция вешающая слушатель на форму
// function setEventListenerForm(form, setting) {
//   form.addEventListener('input', (evt, setting) => {
//     handlerInputForm(evt, setting)
//   })
// }

// // profileEditForm.addEventListener('input', handlerInputForm);
// // addPhotoForm.addEventListener('input', handlerInputForm);

// function handlerInputForm(evt, setting) {
//   const form = evt.currentTarget;
//   validateForm(form);
//   validateInput(evt.target);     
// }

// // функция проверки валидности формы
// function validateForm(form, setting) {
//   const submitButton = form.querySelector('.popup__button-save');
//   console.log(form.checkValidity())
//   if(form.checkValidity()){
//     submitButton.removeAttribute('disabled');
//     submitButton.classList.remove('popup__button-save_invalid')
//   }
//   else{
//     submitButton.setAttribute('disabled', true);
//     submitButton.classList.add('popup__button-save_invalid')
//   }
// }

// //проверка валидности инпутов
// function validateInput(input) {
//   const errorElement = input.closest('.popup__forms').querySelector(`#${input.id}-error`);
//   input.classList.add('popup__form_error')
//   errorElement.textContent = input.validationMessage
// }







// validateForm(profileEditForm);  // эту функцию нужно вешать на открытие попапа
// validateForm(addPhotoForm);




// enableValidation({
//   formSelector: '.popup__forms',
//   inputSelector: '.popup__form',
//   submitButtonSelector: '.popup__button-save',
//   inactiveButtonClass: 'popup__button-save_invalid',
//   inputErrorClass: 'popup__form_error',
//   errorClass: 'popup__error'
// }); 




/////////////////////////////////////////////////////////////////////////
//функция отвечающая за отображение ошибки
const showError = (formElement, input, errorMessage, setting) => {
  const errorElement = formElement.querySelector(`#${input.id}-error`)
  input.classList.add(setting.inputErrorClass);
  errorElement.textContent = errorMessage;
};

//функция отвечающая за скрытие ошибки в инпуте
const hideError = (formElement, input, setting) => {
  const errorElement = formElement.querySelector(`#${input.id}-error`)
  input.classList.remove(setting.inputErrorClass)
  errorElement.textContent = ''
};

//функция отвечающая за проверку инпута на валидность 
function checkInputValidity(formElement, inputElement, setting) {
  if (!inputElement.validity.valid){
    showError(formElement, inputElement, inputElement.validationMessage, setting)
  }
  else{
    hideError(formElement, inputElement, setting)
  }
}

//функция присваивающая слушатели интупам в какой-либо форме
function setEventLiseners(formElement, setting) {
  const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
  const buttonElement = formElement.querySelector(setting.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, setting)
      toggleButtonState(inputList, buttonElement, setting)
    })
  })
}


//функция валидирующая кнопку при вызове
function validateForm(formElement, setting) {
  const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
  const buttonElement = formElement.querySelector(setting.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, setting);
  
}
//функция валидирующая инпуты при вызове
function validateInput(formElement, setting){
  const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement, setting)
  })
}


//функция проверки валидности всех инпутов в форме 
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
})
}


//функция отвечающая за состояние кнопки в зависимости от того
//есть ли хоть один невалидный инпут
function toggleButtonState(inputList, buttonElement, setting) {
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(setting.inactiveButtonClass)
    buttonElement.setAttribute('disabled', true)
  }
  else{
    buttonElement.classList.remove(setting.inactiveButtonClass)
    buttonElement.removeAttribute('disabled', true)
  }
}


//функция включающая валидацию во всех форма
function enableValidation(setting) {
  const formList = Array.from(document.querySelectorAll(setting.formSelector))
  formList.forEach((formElement) => {
    setEventLiseners(formElement, setting)
    validateForm(formElement, setting)
  })
}






enableValidation({
    formSelector: '.popup__forms',
    inputSelector: '.popup__form',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_invalid',
    inputErrorClass: 'popup__form_error',
    errorClass: 'popup__error'
  });