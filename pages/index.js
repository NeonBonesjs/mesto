const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;
const initialCards = [
    {
      title: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      title: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      title: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      title: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      title: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      title: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
  ];



// Реализовал появление карточек из заданного массива

const renderItems = () => {
    initialCards.forEach(renderItem);//прогон массива через функцию обработчик
};


const renderItem = (item) => {
    const card = elementTemplate.cloneNode(true);
    card.querySelector('.element__name').textContent = item.title;//функция обработчик  
    card.querySelector('.element__image').src = item.link;
    setEventListener(card);
    elements.insertBefore(card, elements.firstElementChild);

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
            openPopup(2);
            cardToPopup(evt);
        })
}
//
//общая функция для открытия всех попапов
 const editButton = document.querySelector('.profile__edit-button');
 const popup = document.querySelectorAll('.popup');
 const addPhotoButton = document.querySelector('.profile__add-button');
 const popupImage = document.querySelector('.popup__image');
 const popupText = document.querySelector('.popup__text');


 const openPopup = (num) => {
    popup[num].classList.add('popup_active');
    setCloseButton(num);
 }



//объявление собственной кнопки закрытия для каждого попапа
 function setCloseButton(num) {
    const closeButton = popup[num].querySelector('.popup__close');
    closeButton.addEventListener('click',() => {
        closePopup(num)
    })
 }
//функция закрытия попапа
const closePopup = (num) => {
    popup[num].classList.remove('popup_active');
    
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
    openPopup(0);
    autoInput();
})
//открытие попапа добавления фото по клику
addPhotoButton.addEventListener('click', () => {
    openPopup(1);
})
//отправка формы для попапа редактирования профиля
const profileEditForm = document.querySelector('#form-edit');
function formSubmitProfile(evt) {
    evt.preventDefault();
    profileName.textContent = inputProfileName.value;
    profileSubname.textContent = inputProfileSubname.value;
    evt.target.closest('.popup').classList.remove('popup_active');
    console.log(initialCards);

    closePopup(0)//закрытие попапа при отправке формы!!!!!!!!
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
    closePopup(1);
    inputTitlePhoto.value = ''
    inputLinkPhoto.value = ''
}
addPhotoForm.addEventListener('submit', formSubmitPhoto);


//функция для присвоения полей карточки полям попапа
const cardToPopup = (evt) => {

    const imageCard = evt.target;
    const textCard = evt.target.closest('.element').querySelector('.element__name')
    console.log(textCard);
    console.log(imageCard);
    popupImage.src = imageCard.src;
    popupText.textContent = textCard.textContent;
   
}

//вызов функции достающей карточки из массива
renderItems();
