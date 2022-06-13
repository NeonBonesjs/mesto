let editButton = document.querySelector('.edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');
let saveButton = document.querySelector('.popup__button-save');
let name = document.querySelector('.profile__name');
let subname = document.querySelector('.profile__subname')
let form = document.querySelector('.form')
let formName = document.querySelector('.popup__form_type_name');
let formSubname = document.querySelector('.popup__form_type_subname');
function inValue (){
  formName.setAttribute('value', name.textContent);
  formSubname.setAttribute('value', subname.textContent);
}
function editor (){
  popup.classList.add('popup_active');
  inValue();
}
editButton.addEventListener('click', editor);
function closeEditor(){
  popup.classList.remove('popup_active');
  inValue();
}
closeButton.addEventListener('click', closeEditor);
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.
  let name = document.querySelector('.profile__name');
  let subname = document.querySelector('.profile__subname')
  name.textContent = `${formName.value}`
  subname.textContent = `${formSubname.value}`
  popup.classList.remove('popup_active');
}
form.addEventListener('submit', formSubmitHandler); 

