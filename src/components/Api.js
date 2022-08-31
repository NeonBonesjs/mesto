export default class Api {
  constructor({baseUrl, token, groupId}){
    this._baseUrl = baseUrl;
    this._token = token;
    this._groupId = groupId;
  }


  getUserInfo = () => {
    return fetch(`${this._baseUrl}/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`ошибка: ${res.status}`)); 
  }



  getInitialCard = () => {
    return  fetch(`${this._baseUrl}/${this._groupId}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`ошибка: ${res.status}`))
  }



  editUserInfo = (data) => {
    return fetch(`${this._baseUrl}/${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.form__name,
        about: data.form__subname
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`ошибка: ${res.status}`)); 
  }


  addNewCard = (data) => {
    return fetch(`${this._baseUrl}/${this._groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`ошибка: ${res.status}`)); 
  }


  removeCard(id) {
    return fetch(`${this._baseUrl}/${this._groupId}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
  }


  putLike = (id) => {
    return fetch(`${this._baseUrl}/${this._groupId}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token, 
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
  }



  deleteLike = (id) => {
    return fetch(`${this._baseUrl}/${this._groupId}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token, 
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
  }


  editAvatar = (data) => {
    return fetch(`${this._baseUrl}/${this._groupId}/users/me/avatar`, {
      method : 'PATCH',
      headers: {
        authorization: this._token, 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
  }

}