const elementList = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;
//
const editButton = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAddPhoto = document.querySelector('.popup_add-photo');
const popupPhoto = document.querySelector('.popup_photo');
const addPhotoButton = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__text');
//


// Реализовал появление карточек из заданного массива

const renderItems = () => {
    initialCards.forEach(renderItem);//прогон массива через функцию обработчик
};


const renderItem = (item) => {
    
    elementList.insertBefore(createItem(item), elementList.firstElementChild);//функция вставки карточки

}

        const createItem = (item) => {
        const card = elementTemplate.cloneNode(true);
        card.querySelector('.element__name').textContent = item.title;//функция создания карточки
        card.querySelector('.element__image').src = item.link;
        card.querySelector('.element__image').alt = item.title;
        setEventListener(card);
        return card;
    }
    

function handleDelete(evt){
    evt.target.closest('.element').remove();
}
function handleLike(evt){
    evt.target.classList.toggle('element__like-button_active')
}
//функция которая присваивает слушателей
function setEventListener(card){
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
    
}
//функция автозаполнения полей для ввода
let profileName = document.querySelector('.profile__name');
let profileSubname = document.querySelector('.profile__subname');
let inputProfileName = document.querySelector('#input-profile-name');
let inputProfileSubname = document.querySelector('#input-profile-subname');

function autoInput() {
    inputProfileName.value = profileName.textContent;
    inputProfileSubname.value = profileSubname.textContent;
}


 //открытие попапа редактирования профиля по клику
editButton.addEventListener('click', () => {
    openPopup(popupEdit);
    autoInput();
})
//открытие попапа добавления фото по клику
addPhotoButton.addEventListener('click', () => {
    openPopup(popupAddPhoto);
})
//отправка формы для попапа редактирования профиля
const profileEditForm = document.querySelector('#form-edit');
function formSubmitProfile(evt) {
    evt.preventDefault();
    profileName.textContent = inputProfileName.value;
    profileSubname.textContent = inputProfileSubname.value;
    closePopup(popupEdit);
}
profileEditForm.addEventListener('submit', formSubmitProfile)


//добавление новой фотографии
const addPhotoForm = document.querySelector('#add-photo-form');
const inputTitlePhoto = document.querySelector('#input-title-photo');
const inputLinkPhoto = document.querySelector('#input-link-photo');


//отправка формы для добовления карточки
function formSubmitPhoto(evt) {
    evt.preventDefault();
    const newElementArr = {title: inputTitlePhoto.value, link: inputLinkPhoto.value};
    initialCards.unshift(newElementArr);
    renderItem(initialCards[0]);
    closePopup(popupAddPhoto);
    evt.target.reset();
}
addPhotoForm.addEventListener('submit', formSubmitPhoto);


//функция для присвоения полей карточки полям попапа
const cardToPopup = (evt) => {

    const imageCard = evt.target;
    const textCard = evt.target.closest('.element').querySelector('.element__name')
    popupImage.src = imageCard.src;
    popupImage.alt = imageCard.alt;
    popupText.textContent = textCard.textContent;
   
}

//вызов функции достающей карточки из массива
renderItems();
//вызов функции присваивающей соответствующие кнопки закрытия попапам
setCloseButtonAll();
