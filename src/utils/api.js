class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Error: ${res.status}`);
    });
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Error: ${res.status}`);
    });
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Error: ${res.status}`);
    });
  }

  updateProfile({ name, about }) {
    fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Error: ${res.status}`);
    });
  }

  updateAvatar({ image }) {
    fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: { image },
    }).then((image) => {
      this._handleServerResponse(image);
    });
  }

  deleteCard() {
    (fetch(`${this._baseUrl}/cards/:cardId `),
    {
      method: "DELETE",
      headers: this._headers,
    }).then((item) => {
      item.closest(".card").remove();
    });
  }

  likeCard() {
    fetch(`${this._baseUrl}/cards/:cardId/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((like) => {
      like++;
    });
  }

  dislikeCard() {
    fetch(`${this._baseUrl}/cards/:cardId/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((like) => {
      like--;
    });
  }
}

export default Api;
