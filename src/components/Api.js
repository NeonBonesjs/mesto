export default class Api {
  constructor({baseUrl, token, groupId}){
    this._baseUrl = baseUrl;
    this._token = token;
    this._groupId = groupId;
  }


  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
} 


  getUserInfo = () => {
    return fetch(`${this._baseUrl}/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._getResponseData(res)); 
  }



  getInitialCard = () => {
    return  fetch(`${this._baseUrl}/${this._groupId}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._getResponseData(res)); 
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
     .then(res => this._getResponseData(res)); 
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
      .then(res => this._getResponseData(res)); 
  }


  removeCard(id) {
    return fetch(`${this._baseUrl}/${this._groupId}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
      .then(res => this._getResponseData(res)); 
  }


  putLike = (id) => {
    return fetch(`${this._baseUrl}/${this._groupId}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token, 
      }
    })
     .then(res => this._getResponseData(res)); 
  }



  deleteLike = (id) => {
    return fetch(`${this._baseUrl}/${this._groupId}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token, 
      }
    })
      .then(res => this._getResponseData(res)); 
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
      .then(res => this._getResponseData(res)); 
  }

}