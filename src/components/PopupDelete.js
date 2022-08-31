import Popup from "./Popup.js"

export default class PopupDelete extends Popup{
  constructor(popupSelector ,deleteCard){
    super(popupSelector);
    this.deleteCard = deleteCard;
    this._card ={}
  }


  open (card) {
    super.open();
    console.log(card)
    return this._card = card
  }



  setEventListeners () {
    console.log(this._card)
    super.setEventListeners();
    // this.delete(this._card)
    this._popopDeleteButton = this._popup.querySelector('.popup__button-save');
    this._popopDeleteButton.addEventListener('click',() => {
    this.deleteCard(this._card);
    this.close()});
  }
}