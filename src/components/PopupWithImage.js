import Popup from "./Popup.js";
export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector)
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupText = this._popup.querySelector('.popup__text');

  }

  open = (imageCard, textCard) => {
    this._popupImage.src = imageCard;
    this._popupImage.alt = textCard;
    this._popupText.textContent = textCard;
    super.open();
  }


}