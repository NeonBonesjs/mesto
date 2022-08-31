
export default class Card {
  constructor(data, templateSelector, handleCardClick, handleTrashButton, handleLikeButton) {
    this._templateSelector = templateSelector;
    this._title = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes;
    this._handleTrashButton = handleTrashButton;
    this._id = data._id
    this._ownerId = data.owner._id 
    this._handleLikeButton = handleLikeButton;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true).querySelector('.element');
    return cardElement;
  }

  _setEventListners = () => {
    this._deleteButton = this._element.querySelector(".element__trash");
    this._deleteButton.addEventListener("click", this._handleTrashButton);
    if(!(this._ownerId === '79de527279c5ab39b73b4c9d')){this._deleteButton.remove()}
    this._likeButton.addEventListener("click", this._handleLikeButton);
    this._elementImage.addEventListener("click", () => {
      this._handleCardClick(this._link, this._title)
    });// !!!!!!
  };

  generateCard = () => {
    this._element = this._getTemplate();
    this._elementText = this._element.querySelector(".element__name");
    this._elementText.textContent = this._title;
    this._elementImage = this._element.querySelector(".element__image");
    this._elementImage.src = this._link;
    this._elementImage.alt = this._title;
    this._likeButton = this._element.querySelector(".element__like-button");

    this._likes.forEach(element => {
      if (element._id === '79de527279c5ab39b73b4c9d') {
        this._likeButton.classList.add('element__like-button_active')
      }
    });
    this._numberLikes = this._element.querySelector('.element__number-like');
    this._numberLikes.textContent = this._likes.length;
    this._setEventListners();
    return this._element;
  };

  handleDelete = () => {
    this._element.remove();
    this._element = null;
  };

  likeScore = (score) => {
    this._likeButton.classList.toggle("element__like-button_active");
    this._numberLikes.textContent = score;
  };


  getCard = () => {
    fetch('https://mesto.nomoreparties.co/v1/cohort-49/cards'), {
      headers: {
      authorization: '2f4f6221-2bd1-4593-b371-8424249e75f7'
      }
    }
  }
  
}
