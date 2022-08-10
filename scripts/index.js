import Card from "./Card.js";
import FormValidation from "./FormValidator.js";
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

const elementList = document.querySelector(".elements");
const elementTemplate = document.querySelector("#element-template").content;
const buttonEdit = document.querySelector(".profile__edit-button");
const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_edit");
const popupAddPhoto = document.querySelector(".popup_add-photo");
export const popupPhoto = document.querySelector(".popup_photo");
const buttonAddPhoto = document.querySelector(".profile__add-button");
export const popupImage = document.querySelector(".popup__image");
export const popupText = document.querySelector(".popup__text");
const profileEditForm = document.querySelector("#form-edit");

function handleDelete(evt) {
  evt.target.closest(".element").remove();
}
function handleLike(evt) {
  evt.target.classList.toggle("element__like-button_active");
}
//функция которая присваивает слушателей карточке
function setEventListenerCard(card) {
  const deleteButton = card.querySelector(".element__trash");
  deleteButton.addEventListener("click", (evt) => {
    handleDelete(evt);
  });

  const likeButton = card.querySelector(".element__like-button");
  likeButton.addEventListener("click", handleLike);

  const imageClick = card.querySelector(".element__image");
  imageClick.addEventListener("click", (evt) => {
    openPopup(popupPhoto);
    cardToPopup(evt);
  });
}
//
//общая функция для открытия всех попапов

export const openPopup = (popup) => {
  popup.classList.add("popup_active");
  document.addEventListener("keydown", closeByEsc);
};

//функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove("popup_active");
  document.removeEventListener("keydown", closeByEsc);
};
//функция автозаполнения полей для ввода
const profileName = document.querySelector(".profile__name");
const profileSubname = document.querySelector(".profile__subname");
const inputProfileName = document.querySelector("#input-profile-name");
const inputProfileSubname = document.querySelector("#input-profile-subname");

function fillInput() {
  inputProfileName.value = profileName.textContent;
  inputProfileSubname.value = profileSubname.textContent;
}

//открытие попапа редактирования профиля по клику
buttonEdit.addEventListener("click", () => {
  openPopup(popupEdit);
  fillInput();
  popupEditProfileValidator.validateInput();
  popupEditProfileValidator.validateButton();
});
//открытие попапа добавления фото по клику
buttonAddPhoto.addEventListener("click", () => {
  openPopup(popupAddPhoto);
  popupAddValidator.validateButton();
});
//отправка формы для попапа редактирования профиля
function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileSubname.textContent = inputProfileSubname.value;
  closePopup(popupEdit);
}
profileEditForm.addEventListener("submit", submitProfileForm);

//добавление новой фотографии
const photoAddForm = document.querySelector("#add-photo-form");
const inputTitlePhoto = document.querySelector("#input-title-photo");
const inputLinkPhoto = document.querySelector("#input-link-photo");

//отправка формы для добовления карточки
function submitFormPhoto(evt) {
  evt.preventDefault();
  const newItem = { title: inputTitlePhoto.value, link: inputLinkPhoto.value };
  renderCard(newItem);
  closePopup(popupAddPhoto);
  evt.target.reset();
}
photoAddForm.addEventListener("submit", submitFormPhoto);

//функция для присвоения полей карточки полям попапа
const cardToPopup = (evt) => {
  const imageCard = evt.target;
  const textCard = evt.target
    .closest(".element")
    .querySelector(".element__name");
  popupImage.src = imageCard.src;
  popupImage.alt = imageCard.alt;
  popupText.textContent = textCard.textContent;
};

//реализация закрытия всех попапов кликом на оверлей
popupEdit.addEventListener("click", (evt) => {
  closePopupClickOverlay(popupEdit, evt);
});
popupAddPhoto.addEventListener("click", (evt) => {
  closePopupClickOverlay(popupAddPhoto, evt);
});
popupPhoto.addEventListener("click", (evt) => {
  closePopupClickOverlay(popupPhoto, evt);
});

//функция закрытия попапа кликом на оверлей
function closePopupClickOverlay(popup, evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(popup);
  }
}

//функция закрытия попапа кликом на esc

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_active");
    closePopup(openedPopup);
  }
}

function returnCard(item) {
  const card = new Card(item, "#element-template");
  const cardElement = card.generateCard();
  return cardElement;
}

function renderCard(item) {
  elementList.prepend(returnCard(item));
}

function renderCards() {
  initialCards.forEach(renderCard);
}
renderCards();

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

const popupAddValidator = validateForm("#add-photo-form");
popupAddValidator.enebleValidation();
const popupEditProfileValidator = validateForm("#form-edit");
popupEditProfileValidator.enebleValidation();
