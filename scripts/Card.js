import { setEventListenerCard } from "./index.js";
export default class Card {

  constructor(data, templateSelector){
      this._templateSelector = templateSelector;
      this._title = data.title;
      this._link = data.link;
  }

  _getTemplate() {
      const cardElement = 
      document
      .querySelector(this._templateSelector)
      .content
      .cloneNode(true);

      return cardElement
  }
  
  generateCard() {
      this._element = this._getTemplate();
      this._element.querySelector('.element__name').textContent = this._title;
      this._element.querySelector('.element__image').src = this._link;
      this._element.querySelector('.element__image').alt = this._title;
      setEventListenerCard(this._element);
      return this._element;
  }

}

