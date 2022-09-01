import Popup from "./Popup.js"

export default class PopupDelete extends Popup{
  constructor(popupSelector ,deleteItem){
    super(popupSelector);
    this.deleteItem = deleteItem;
    this._card ={}
  }


  open (card) {
    super.open();
    console.log(card)
    return this._card = card
  }



  setEventListeners () {
    super.setEventListeners();
    // this.delete(this._card)
    this._popopDeleteButton = this._popup.querySelector('.popup__button-save');
    this._popopDeleteButton.addEventListener('click',() => {
    this.deleteItem(this._card);
    });
  }
}