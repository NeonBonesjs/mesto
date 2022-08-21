// import { openPopup } from "./index.js";
// import { popupPhoto } from "./index.js";
// import { popupImage } from "./index.js";
// import { popupText } from "./index.js";
export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._title = data.title;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true).children[0];
    return cardElement;
  }

  _setEventListners = () => {
    this._deleteButton = this._element.querySelector(".element__trash");
    this._deleteButton.addEventListener("click", this._handleDelete);
    this._likeButton = this._element.querySelector(".element__like-button");
    this._likeButton.addEventListener("click", this._handleLike);
    this._elementImage.addEventListener("click", () => {
      this._handleCardClick(this._elementImage, this._elementText)
    });// !!!!!!
  };

  generateCard = () => {
    this._element = this._getTemplate();
    this._elementText = this._element.querySelector(".element__name");
    this._elementText.textContent = this._title;
    this._elementImage = this._element.querySelector(".element__image");
    this._elementImage.src = this._link;
    this._elementImage.alt = this._title;
    this._setEventListners();
    return this._element;
  };

  _handleDelete = () => {
    this._element.remove();
  };

  _handleLike = () => {
    this._likeButton.classList.toggle("element__like-button_active");
  };

  // _handleClickImage = () => {
  //   openPopup(popupPhoto);
  //   this._cardtoPopup();
  // };

  _cardtoPopup() {
    popupImage.src = this._elementImage.src;
    popupImage.alt = this._elementImage.alt;
    popupText.textContent = this._elementText.textContent;
  }
}
