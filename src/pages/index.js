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
import Api from "../components/Api.js";
import PopupDelete from "../components/PopupDelete.js";





const buttonEdit = document.querySelector(".profile__edit-button");
const avatarButton = document.querySelector('.profile__avatar');
const buttonAddPhoto = document.querySelector(".profile__add-button");

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  token: '2f4f6221-2bd1-4593-b371-8424249e75f7',
  groupId: 'cohort-49'
})

let userId = ''
api.getUserInfo().then((res) => userId = res._id);


const popupDelete = new PopupDelete('.popup_delete-photo', (card) => {
  removeCard(card)
});
popupDelete.setEventListeners();


function addLike(card) {
  api.putLike(card._id)
    .then((res) => {
      card.likeScore(res.likes.length)
    })
    .catch(err => console.log(`Error: ${err}`));
}



function removeLike(card) {
  api.deleteLike(card._id)
    .then((res) => {
      card.likeScore(res.likes.length)
    })
    .catch(err => console.log(`Error: ${err}`));
}






function createCard(item){
  

  const card = new Card(item, "#element-template", (imageCard, textCard) => {
    
    popupPhoto.open(imageCard, textCard);
    
  },() => {
      popupDelete.open(card)
    },
    (evt) => {
      if (!evt.target.classList.contains('element__like-button_active')){
        addLike(card)
      }
      else{
        removeLike(card)
      }
    }, userId);
  const cardElement = card.generateCard();
  return cardElement
}

const removeCard = (card) => {
  console.log(card)
  api.removeCard(card._id)
    .then((res) => {
      card.handleDelete();
      popupDelete.close();
    })
    .catch(err => console.log(`Error: ${err}`));
}
const popupPhoto = new PopupWithImage('.popup_photo');
popupPhoto.setEventListeners();

const cardsAdd = new Section({ 
  rendered:(item) => {
  cardsAdd.addItem(createCard(item));
}}, '.elements')


// cardsAdd.renderItem();

const formAddPhoto = document.querySelector('#add-photo-form');
const formEditProfile = document.querySelector('#form-edit');
const formEditAvatar = document.querySelector('#edit-avatar-form');

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
const userInfo = new UserInfo({nameSelector:'.profile__name', infoSelector:'.profile__subname', avatarSelector:'.profile__avatar'});

const popupAddValidator = validateForm(formAddPhoto);
popupAddValidator.enebleValidation();
const popupEditProfileValidator = validateForm(formEditProfile);
popupEditProfileValidator.enebleValidation();
const popupEditAvatarValidator = validateForm(formEditAvatar);
popupEditAvatarValidator.enebleValidation();

const popupProfile = new PopupWithForm('.popup_edit', (evt, objectInputValues) => {
  evt.preventDefault();
  popupProfile.renderLoading(true);
  const object = objectInputValues;
  console.log(object)
  api.editUserInfo(object)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupProfile.close()
    })
    .catch(err => console.log(`Error: ${err}`))
    .finally(popupProfile.renderLoading(false));
})

popupProfile.setEventListeners();
buttonEdit.addEventListener('click',() => {
  popupProfile.open();
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfileValidator.validateButton();
  popupEditProfileValidator.validateInput();
})


const popupAddNewPhoto = new PopupWithForm('.popup_add-photo', (evt, objectInputValues) => {
  evt.preventDefault();
  const object = objectInputValues;
  const newCardObject = {name:object.form__name, link:object.form__subname};
  popupAddNewPhoto.renderLoading(true);
  api.addNewCard(newCardObject)
    .then((res) => {
      cardsAdd.rendered(res);
      popupAddNewPhoto.close();
    })
    .catch(err => console.log(`Error: ${err}`))
    .finally(popupAddNewPhoto.renderLoading(false))

} );

popupAddNewPhoto.setEventListeners();
buttonAddPhoto.addEventListener('click',() => {
  popupAddNewPhoto.open();
  popupAddValidator.validateButton();
  popupAddValidator.validateInput();

})


Promise.all([api.getInitialCard(), api.getUserInfo()])
  .then((res) => {
    cardsAdd.renderItem(res[0].reverse());
    userInfo.setUserAvatar(res[1])
    userInfo.setUserInfo(res[1])
  })
  
  .catch(err => console.log(`Error: ${err}`))
//
// api.getInitialCard()
//   .then(res => {
//     cardsAdd.renderItem(res);
//     console.log(res);
//   })
//   .catch(err => console.log(`Error: ${err}`));

// api.getUserInfo()
//   .then((res) => {
//     console.log(res)
//     avatarButton.src = res.avatar;
//     document.querySelector('.profile__name').textContent = res.name;
//     document.querySelector('.profile__subname').textContent = res.about;
//   })
//   .catch(err => console.log(`Error: ${err}`));



  

  const popupEditAvatar = new PopupWithForm('.popup_avatar', (evt, objectInputValues) => {
    evt.preventDefault();
    popupEditAvatar.renderLoading(true);
    console.log(objectInputValues);
    const newCardObject = {avatar:objectInputValues.form__subname}
    api.editAvatar(newCardObject)
      .then((res) => {
        userInfo.setUserAvatar(res);
        popupEditAvatar.close()
      })
      .catch(err => console.log(`Error: ${err}`))
      .finally(popupEditAvatar.renderLoading(false))
  });
  popupEditAvatar.setEventListeners();
  avatarButton.addEventListener('click',() => {
    popupEditAvatar.open();
    popupEditAvatarValidator.validateButton();
    popupEditAvatarValidator.validateInput();
  });