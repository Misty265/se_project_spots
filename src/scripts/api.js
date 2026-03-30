export class Api {
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

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
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
    }).then(
      ((res) => {
        this._handleServerResponse(res);
      }).catch((err) => {
        console.err(err);
      }),
    );
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(this._handleServerResponse)
      .then(this.getCards);
  }

  updateProfile(name, description) {
    fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        description,
      }),
    })
      .then(this._handleServerResponse)
      .then(this.getUser);
  }

  updateAvatar(image) {
    fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: { image },
    });
  }

  deleteCard() {
    (fetch(`${this._baseUrl}/:cardId `),
      {
        method: "DELETE",
        headers: this._headers,
      });
  }

  likeCard() {
    fetch(`${this._baseUrl}/:cardId/likes`, {});
  }

  dislikeCard() {
    fetch(`${this._baseUrl}/:cardId/likes`, {});
  }
}
