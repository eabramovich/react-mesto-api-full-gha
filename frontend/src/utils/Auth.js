import Api from './Api';

class AuthApi {
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

  signup({ email, password }) {
    return this._request('/signup', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  }

  signin({ email, password }) {
    return this._request('/signin', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  }

  getContent(token) {
    return this._request('/users/me', {
      method: 'GET',
      headers: {...this._headers,
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const authApi = new AuthApi({
  // baseUrl: 'https://auth.nomoreparties.co',
  //baseUrl: 'http://localhost:3000',
  baseUrl: 'http://api.jane-mesto.nomoredomainsmonster.ru/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default authApi;
