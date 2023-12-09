class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(`Что-то пошло не так: ${response.status}`);
  }

  _request(endpoint, options) {
    return fetch(this._baseUrl + endpoint, options).then(this._handleResponse);
  }

  getUserInfo(token) {
    return this._request("/users/me", {
      method: "GET",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    });
  }

  updateUserInfo(name, about, token) {
    return this._request("/users/me", {
      method: "PATCH",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  updateUserAvatar(imageLink, token) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        avatar: imageLink,
      }),
    });
  }

  getInitialCards(token) {
    return this._request("/cards", {
      method: "GET",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    });
  }

  addNewCard({ link, name }, token) {
    return this._request("/cards", {
      method: "POST",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  removeCard(cardId, token) {
    return this._request("/cards/" + cardId, {
      method: "DELETE",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    });
  }

  addLikeCard(cardId, token) {
    return this._request("/cards/" + cardId + "/likes", {
      method: "PUT",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    });
  }

  removeLikeCard(cardId, token) {
    return this._request("/cards/" + cardId + "/likes", {
      method: "DELETE",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    });
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    if (isLiked) {
      return this.addLikeCard(cardId, token);
    } else {
      return this.removeLikeCard(cardId, token);
    }
  }
}

const api = new Api({
  // baseUrl: "https://mesto.nomoreparties.co/v1/cohort-74",
  baseUrl: "http://localhost:3000",
  headers: {
    // authorization: "f5d4ffa0-2360-4168-849b-08882ca95571",
    "Content-Type": "application/json",
  },
});

export default api;
