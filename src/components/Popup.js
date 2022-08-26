export default class Popup{
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
  }

  open () {
    this._popup.classList.add("popup_active");
    document.addEventListener('keydown', this._handleEscClose);
  }

  close () {
    this._popup.classList.remove("popup_active");
    document.removeEventListener('keydown', this._handleEscClose)
  }

  setEventListeners () {
    this._popup.addEventListener('click', this._closePopupClickOverlay)
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _closePopupClickOverlay = (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close")
    ) {
      this.close();
    }
  }
}