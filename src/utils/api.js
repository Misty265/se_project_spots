class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._likes = 0;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._checkRes(res));
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._checkRes(res));
  }

  getAppInfo() {
    return Promise.all([this.getCards(), this.getUser()]);
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then((res) => this._checkRes(res));
  }

  updateProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then((res) => this._checkRes(res));
  }

  deleteCard({ card }) {
    return fetch(`${this._baseUrl}/cards/${card._id}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({ card }),
    }).then((res) => {
      return this._checkRes(res);
    });
  }

  likeCard({ card }) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkRes(res));
  }

  dislikeCard({ card }) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkRes(res));
  }

  updateAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then((res) => this._checkRes(res));
  }
}

export default Api;
