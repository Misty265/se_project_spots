export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUser({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      body: { name, about },
    })
      .then((res) => {
        this._handleServerResponse(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        return this._handleServerResponse(res);
      })
      .catch((err) => {
        console.err(err);
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
    })
      .then(this._handleServerResponse)
      .then(this.getCards)
      .catch((err) => {
        console.err(err);
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
    })
      .then(this._handleServerResponse)
      .then(this.getUser)
      .catch((err) => {
        console.error(err);
      });
  }

  updateAvatar({ image }) {
    fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: { image },
    })
      .then((image) => {
        this._handleServerResponse(image);
      })
      .then(this.getUser)
      .catch((err) => {
        console.error(err);
      });
  }

  deleteCard() {
    (fetch(`${this._baseUrl}/:cardId `),
    {
      method: "DELETE",
      headers: this._headers,
    })
      .then((card) => {
        card.closest(".card").delete();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  likeCard() {
    fetch(`${this._baseUrl}/:cardId/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((like) => {
      like++;
    });
  }

  dislikeCard() {
    fetch(`${this._baseUrl}/:cardId/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((like) => {
      like--;
    });
  }
}
