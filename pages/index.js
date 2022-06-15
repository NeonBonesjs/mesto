let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');
let name = document.querySelector('.profile__name');
let subname = document.querySelector('.profile__subname')
let form = document.querySelector('.popup__forms')
let formName = document.querySelector('.popup__form_type_name');
let formSubname = document.querySelector('.popup__form_type_subname');
function inValue() {
    formName.setAttribute('value', name.textContent);
    formSubname.setAttribute('value', subname.textContent);
}
function editor() {
    popup
        .classList
        .add('popup_active');
    inValue();
}
editButton.addEventListener('click', editor);
function closeEditor() {
    popup
        .classList
        .remove('popup_active');
    inValue();
}
closeButton.addEventListener('click', closeEditor);
function formSubmitHandler(evt) {
    evt.preventDefault();
    let name = document.querySelector('.profile__name');
    let subname = document.querySelector('.profile__subname');
    name.textContent = formName.value;
    subname.textContent = formSubname.value;
    closeEditor();
}
form.addEventListener('submit', formSubmitHandler);

