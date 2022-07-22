const elementList = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;
const buttonEdit = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAddPhoto = document.querySelector('.popup_add-photo');
const popupPhoto = document.querySelector('.popup_photo');
const buttonAddPhoto = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__text');
const profileEditForm = document.querySelector('#form-edit');

// Реализовал появление карточек из заданного массива

const renderItems = () => {
    initialCards.forEach(renderItem);//прогон массива через функцию обработчик
};


const renderItem = (item) => {
    
    elementList.prepend(createItem(item));//функция вставки карточки

}

    const createItem = (item) => {
    const card = elementTemplate.cloneNode(true);
    card.querySelector('.element__name').textContent = item.title;
    const cardImage = card.querySelector('.element__image');         //функция создания карточки
    cardImage.src = item.link;
    cardImage.alt = item.title;
    setEventListenerCard(card);
    return card;
    }
    

function handleDelete(evt){
    evt.target.closest('.element').remove();
}
function handleLike(evt){
    evt.target.classList.toggle('element__like-button_active')
}
//функция которая присваивает слушателей карточке
function setEventListenerCard(card){
    const deleteButton = card.querySelector('.element__trash');
    deleteButton.addEventListener('click',(evt) => {handleDelete(evt)});
    
    const likeButton = card.querySelector('.element__like-button');
    likeButton.addEventListener('click', handleLike);

    const imageClick = card.querySelector('.element__image');
    imageClick.addEventListener('click', (evt) => {
            openPopup(popupPhoto);
            cardToPopup(evt);
        })
}
//
//общая функция для открытия всех попапов
 

 const openPopup = (popup) => {
    popup.classList.add('popup_active');
    document.addEventListener('keydown', closeByEsc);
 }
//перебор нодлиста попапов и назначение каждому из них своей кнопки закрытия
const setCloseButtonAll = () => {
    popups.forEach(setCloseButton)
}

//объявление собственной кнопки закрытия для любого попапа
 function setCloseButton(popup) {
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click',() => {
        closePopup(popup)
    })
 }
//функция закрытия попапа
const closePopup = (popup) => {
    popup.classList.remove('popup_active');
    document.removeEventListener('keydown', closeByEsc);

}
//функция автозаполнения полей для ввода
const profileName = document.querySelector('.profile__name');
const profileSubname = document.querySelector('.profile__subname');
const inputProfileName = document.querySelector('#input-profile-name');
const inputProfileSubname = document.querySelector('#input-profile-subname');

function fillInput() {
    inputProfileName.value = profileName.textContent;
    inputProfileSubname.value = profileSubname.textContent;
}


 //открытие попапа редактирования профиля по клику
buttonEdit.addEventListener('click', () => {
    openPopup(popupEdit);
    fillInput();
    validateInput(profileEditForm, {
        formSelector: '.popup__forms',
        inputSelector: '.popup__form',
        submitButtonSelector: '.popup__button-save',
        inactiveButtonClass: 'popup__button-save_invalid',
        inputErrorClass: 'popup__form_error',
        errorClass: 'popup__error'
      })
    validateForm(profileEditForm, {
        formSelector: '.popup__forms',
        inputSelector: '.popup__form',
        submitButtonSelector: '.popup__button-save',
        inactiveButtonClass: 'popup__button-save_invalid',
        inputErrorClass: 'popup__form_error',
        errorClass: 'popup__error'
      })
})
//открытие попапа добавления фото по клику
buttonAddPhoto.addEventListener('click', () => {
    openPopup(popupAddPhoto);
    validateForm(PhotoAddForm, {
        formSelector: '.popup__forms',
        inputSelector: '.popup__form',
        submitButtonSelector: '.popup__button-save',
        inactiveButtonClass: 'popup__button-save_invalid',
        inputErrorClass: 'popup__form_error',
        errorClass: 'popup__error'
      })

})
//отправка формы для попапа редактирования профиля
function SubmitProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = inputProfileName.value;
    profileSubname.textContent = inputProfileSubname.value;
    closePopup(popupEdit);
}
profileEditForm.addEventListener('submit', SubmitProfileForm)


//добавление новой фотографии
const PhotoAddForm = document.querySelector('#add-photo-form');
const inputTitlePhoto = document.querySelector('#input-title-photo');
const inputLinkPhoto = document.querySelector('#input-link-photo');


//отправка формы для добовления карточки
function formSubmitPhoto(evt) {
    evt.preventDefault();
    // const newElementArr = {title: inputTitlePhoto.value, link: inputLinkPhoto.value};
    // initialCards.unshift(newElementArr);
    // renderItem(initialCards[0]);
    const card = elementTemplate.cloneNode(true);
    card.querySelector('.element__name').textContent = inputTitlePhoto.value;
    const cardImage = card.querySelector('.element__image');        
    cardImage.src = inputLinkPhoto.value;
    cardImage.alt = inputTitlePhoto.value;
    setEventListenerCard(card);
    elementList.prepend(card)
    closePopup(popupAddPhoto);
    evt.target.reset();
}
PhotoAddForm.addEventListener('submit', formSubmitPhoto);


//функция для присвоения полей карточки полям попапа
const cardToPopup = (evt) => {

    const imageCard = evt.target;
    const textCard = evt.target.closest('.element').querySelector('.element__name')
    popupImage.src = imageCard.src;
    popupImage.alt = imageCard.alt;
    popupText.textContent = textCard.textContent;
   
}

//реализация закрытия всех попапов кликом на оверлей
popupEdit.addEventListener('click', (evt) => {
    closePopupClickOverlay(popupEdit, evt)
})
popupAddPhoto.addEventListener('click', (evt) => {
    closePopupClickOverlay(popupAddPhoto, evt)
})
popupPhoto.addEventListener('click', (evt) => {
    closePopupClickOverlay(popupPhoto, evt)
})



//функция закрытия попапа кликом на оверлей
function closePopupClickOverlay (popup, evt) {
    if(evt.target === evt.currentTarget){
        closePopup(popup);
    }
}

//функция закрытия попапа кликом на esc

function closeByEsc(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_active');
      closePopup(openedPopup); 
    }
}  







// fillInput()

//вызов функции достающей карточки из массива
renderItems();
//вызов функции присваивающей соответствующие кнопки закрытия попапам
setCloseButtonAll();
