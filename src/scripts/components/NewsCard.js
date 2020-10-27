export class NewsCard {
  constructor (cardData, template, dateConverter, api) {
    this._template = template;
    this._dateConverter = dateConverter;
    this._api = api;
    this._cardData = cardData;

    this._view = this._template.content.cloneNode(true).children[0];
    this._image = this._view.querySelector('.news__image');
    this._date = this._view.querySelector('.news__date');
    this._title = this._view.querySelector('.news__title');
    this._text = this._view.querySelector('.news__paragraph');
    this._link = this._view.querySelector('.news__link');
    this._button = this._view.querySelector('.news__button');
    this._tooltip = this._view.querySelector('.news__tooltip');
    this._keywords = this._view.querySelector('.news__keywords');
    this._isSaved = false;
  }

  render = () => {
    if (!this._cardData.date) {
      this._keywords = this._cardData.keywords;
      this._image.setAttribute('src', this._cardData.urlToImage);
      this._date.textContent = this._dateConverter(this._cardData.publishedAt);
      this._title.textContent = this._cardData.title;
      this._text.textContent = this._cardData.description;
      this._link.textContent = this._cardData.source.name;
      this._link.setAttribute('href', this._cardData.url);
      this.renderIcon('index');
    } else {
      this._serverId = this._cardData._id;
      this._keywords.textContent = this._cardData.keyword;
      this._image.setAttribute('src', this._cardData.image);
      this._date.textContent = this._dateConverter(this._cardData.date);
      this._title.textContent = this._cardData.title;
      this._text.textContent = this._cardData.text;
      this._link.textContent = this._cardData.source;
      this._link.setAttribute('href', this._cardData.link);
      this.renderIcon('saved');
    }

    this._setListeners();
    return this._view;
  }

  renderIcon = (page) => {
    if (page === 'index') {
      if (localStorage.isLoggedIn === 'true') {
        this._tooltip.textContent = 'Добавить в сохранённые';
      } else {
        this._tooltip.textContent = 'Войдите, чтобы сохранять статьи';
      }
    } if (page === 'saved') {
      this._tooltip.textContent = 'Убрать из сохранённых'
    }
  }

  _saveCard = () => {
    this._isSaved = true;
    return this._api.createArticle({
      keyword: this._keywords,
      title: this._cardData.title,
      text: this._cardData.content,
      date: this._cardData.publishedAt,
      source: this._cardData.source.name,
      link: this._cardData.url,
      image: this._cardData.urlToImage,
    }).then((data) => {
      this._button.removeAttribute('disabled');
      this._serverId = data.data._id;
    });
  }

  _deleteCard = () => {
    this._isSaved = false;
    return this._api.deleteArticle(this._serverId);
  }

  _iconClickHandler = (event) => {
    this._button.setAttribute('disabled', true)
    if (localStorage.isLoggedIn === 'true') {
      if (event.target.classList.contains('news__button_add')) {
        this._saveCard()
          .then(() => {
            this._button.removeAttribute('disabled');
            this._button.classList.remove('news__button_add');
            this._button.classList.add('news__button_bookmark');
          })
          .catch((error) => {
            error.json();
            this._button.removeAttribute('disabled');
          })
      }
      if (event.target.classList.contains('news__button_bookmark')) {
        this._deleteCard()
          .then(() => {
            this._button.removeAttribute('disabled');
            this._button.classList.remove('news__button_bookmark');
            this._button.classList.add('news__button_add');
          })
          .catch((error) => {
            error.json();
            this._button.removeAttribute('disabled');
          })
      }
      if (event.target.classList.contains('news__button_delete')) {
        this._deleteCard()
          .then(() => {
            this._view.remove();
            this._button.removeAttribute('disabled');
          })
          .catch((error) => {
            error.json()
            this._button.removeAttribute('disabled');
          })
      }
    };
  }

  _setListeners = () => {
    this._button.addEventListener('click', this._iconClickHandler);
  }

}