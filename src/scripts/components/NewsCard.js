module.exports = class NewsCard {
  constructor (template) {
    this._template = template;
  }

  create = (cardData) => {
    this._view = this._template.content.cloneNode(true).children[0];
    this._image = this._view.querySelector('.news__image');
    this._date = this._view.querySelector('.news__date');
    this._title = this._view.querySelector('.news__title');
    this._text = this._view.querySelector('.news__paragraph');
    this._link = this._view.querySelector('.news__link');
    this._button = this._view.querySelector('.news__button');
    this._tooltip = this._view.querySelector('.news__tooltip');
    this._cardData = cardData;
    this._render();
    return this._view;
  }

  _render = () => {
    console.log(this._cardData.publishedAt);
    console.log(typeof this._cardData.publishedAt);
    this._image.setAttribute('src', this._cardData.urlToImage);
    this._date.textContent = this._cardData.publishedAt;
    this._title.textContent = this._cardData.title;
    this._text.textContent = this._cardData.content;
    this._link.textContent = this._cardData.source.name;
    this._link.setAttribute('href', this._cardData.url);
    this.renderIcon();
  }

  renderIcon = () => {
    if (localStorage.isLoggedIn === 'true') {
      this._tooltip.classList.add('news__tooltip_disabled');
    }
  }
}