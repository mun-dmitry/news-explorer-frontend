module.exports = class MainApi {
  constructor(apiProps) {
    this._baseURL = apiProps.baseUrl;
  }

  signup(userData) {
    return fetch(`${this._baseURL}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        name: userData.name,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((data) => data)
      .catch((error) => error.json());
  }

  signin(userData) {
    return fetch(`${this._baseURL}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => data)
      .catch((error) => error.json());
  }

  getUserData() {
    return fetch(`${this._baseURL}users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        // authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => data)
      .catch((error) => error.json());
  }

  getArticles() {
    return fetch(`${this._baseURL}articles`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        // authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => data)
      .catch((error) => error.json());
  }

  createArticle(article) {
    return fetch(`${this._baseURL}articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        // authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: article.keyword,
        title: article.title,
        text: article.text,
        date: article.date,
        source: article.source,
        link: article.link,
        image: article.image,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => data)
      .catch((error) => error.json());
  }
};
