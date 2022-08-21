import Popup from "./Popup.js";
export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector)
  }

  open = (imageCard, textCard) => {
    this._popup.classList.add("popup_active");
    document.addEventListener('keydown', this._handleEscClose);
    this._renamePopup(imageCard, textCard);
  }

  _renamePopup = (imageCard, textCard) => {
    
    // const imageCard = this._elementImage;
    // const textCard = this._elementText;
 

    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupText = this._popup.querySelector('.popup__text');

    this._popupImage.src = imageCard.src;
    this._popupImage.alt = imageCard.alt;
    this._popupText.textContent = textCard.textContent;
  }
}