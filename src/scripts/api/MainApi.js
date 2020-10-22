export class MainApi {
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
        return Promise.reject(res.message);
      })
      .then((data) => data)
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
      .then((res) => (res.ok ? res.json() : Promise.reject(res.message)))
      .then((data) => data)
  }

  getUserData() {
    return fetch(`${this._baseURL}users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.message)))
      .then((data) => data)
  }

  getArticles() {
    return fetch(`${this._baseURL}articles`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.message)))
      .then((data) => data)
  }

  createArticle(article) {
    return fetch(`${this._baseURL}articles`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
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
      .then((res) => (res.ok ? res.json() : Promise.reject(res.message)))
      .then((data) => data)
  }

  deleteArticle(articleId) {
    return fetch(`${this._baseURL}articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.message)))
      .then((data) => data)
  }
};
