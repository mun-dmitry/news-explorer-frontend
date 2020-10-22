module.exports = class NewsApi {
  constructor (newsApiProps) {
    this._url = newsApiProps.url;
    this._apiKey = newsApiProps.apiKey;
    this._date = newsApiProps.date;
    this._pageSize = newsApiProps.pageSize;
    this._timeDifference = newsApiProps.timeDifference;
  }

  _formatDate = (date) => {
    const yy = date.getFullYear();
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = `0${mm}`;
    let dd = date.getDate();
    if (dd < 10) dd = `0${dd}`;
    return `${yy}-${mm}-${dd}`;
  }

  _setDates = () => {
    this._to = new Date();
    this._from = new Date();
    this._from.setTime(this._to.getTime() + this._timeDifference);
    this._to = this._formatDate(this._to);
    this._from = this._formatDate(this._from);
  }

  getNews = (keyword) => {
    this._setDates();
    return fetch(`${this._url}q=${keyword}&from=${this._from}&to=${this._to}&sortBy=popularity&apiKey=${this._apiKey}&pageSize=${this._pageSize}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((articles) => {
        articles.keyword = keyword;
        return articles;
      })
      .catch((error) => error.json());
  }
}