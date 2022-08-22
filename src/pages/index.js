import index from "./index.css";

const logo = new URL('../image/logo.svg', import.meta.url);
const avatar = new URL('../image/Avatar.png', import.meta.url);

const images = [
    {name: 'logo', image: logo},
    {name: 'avatar', link: avatar}
  ]

document.querySelector('.logo').src = images[0].image;
document.querySelector('.profile__avatar').src = images[1].link;


import Card from "../components/Card.js";
import FormValidation from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Popup from "../components/Popup.js";
const initialCards = [
  {
    title: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    title: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    title: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    title: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    title: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    title: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];


const buttonEdit = document.querySelector(".profile__edit-button");

const buttonAddPhoto = document.querySelector(".profile__add-button");

function createCard(item){
  const card = new Card(item, "#element-template", (imageCard, textCard) => {
    
    popupPhoto.open(imageCard, textCard);
    
  });
  const cardElement = card.generateCard();
  return cardElement
}


const popupPhoto = new PopupWithImage('.popup_photo');
popupPhoto.setEventListeners();

const cardsAdd = new Section({items:initialCards, 
  rendered:(item) => {
  cardsAdd.addItem(createCard(item));
}}, '.elements')


cardsAdd.renderItem();

const formAddPhoto = document.querySelector('#add-photo-form');
const formEditProfile = document.querySelector('#form-edit')

function validateForm(formElement) {
  const formValidation = new FormValidation(
    {
      formSelector: ".popup__forms",
      inputSelector: ".popup__form",
      submitButtonSelector: ".popup__button-save",
      inactiveButtonClass: "popup__button-save_invalid",
      inputErrorClass: "popup__form_error",
      errorClass: "popup__error",
    },
    formElement
  );
  return formValidation;
}
const userInfo = new UserInfo({nameSelector:'.profile__name', infoSelector:'.profile__subname'});

const popupAddValidator = validateForm(formAddPhoto);
popupAddValidator.enebleValidation();
const popupEditProfileValidator = validateForm(formEditProfile);
popupEditProfileValidator.enebleValidation();

const editPopup = new PopupWithForm('.popup_edit', (evt, objectInputValues) => {
  evt.preventDefault();
  const object = objectInputValues;
  console.log(object)
  userInfo.setUserInfo(object);
  editPopup.close();
}, () => {
  return userInfo.getUserInfo();
})

editPopup.setEventListeners();
buttonEdit.addEventListener('click',() => {
  editPopup.open();
  editPopup.fillInput();
  popupEditProfileValidator.validateButton();
  popupEditProfileValidator.validateInput();
})


const addPopup = new PopupWithForm('.popup_add-photo', (evt, objectInputValues) => {
  evt.preventDefault();
  const object = objectInputValues;
  const newCardObject = {title:object.form__name, link:object.form__subname};
  cardsAdd.rendered(newCardObject);
  addPopup.close();
} );

addPopup.setEventListeners();
buttonAddPhoto.addEventListener('click',() => {
  addPopup.open();
  popupAddValidator.validateButton();
  popupAddValidator.validateInput();

})