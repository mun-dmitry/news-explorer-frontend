module.exports = class NewsCardlist {
  constructor (cardListProps, createCard) {
    this._template = cardListProps.template;
    this._parentObject = cardListProps.parentObject;
    this._errorMessage = cardListProps.errorMessage;
    this._sectionTitleText = cardListProps.sectionTitleText;
    this._articlesShown = cardListProps.articlesShown;
    this._createCard = createCard();
  }

  create = () => {
    this.view = this._template.content.cloneNode(true).children[0];
    this._preloader = this.view.querySelector('.preloader');
    this._noResults = this.view.querySelector('.no-results');
    this._cardList = this.view.querySelector('.news-list');
    this._sectionTitle = this.view.querySelector('.section-title');
    this._error = this.view.querySelector('.no-results__error');
    this._button = this.view.querySelector('.results__button');
    this._parentObject.append(this.view);
  }

  remove = () => {
    this.view.remove();
  }

  renderResults = (data) => {
    this._toggleLoader();
    this._data = data;
    this._keyword = data.keyword;
    this._hideNoresults();
    this._articles = data.articles;
    this._sectionTitle.textContent = this._sectionTitleText;
    this._articleIndex = 0;
    if (this._articles.length === 0) { this._showNoresults() }
    else {
      this._showButton();
      this._setListener();
      this.renderCards();
    }
  }

  renderCards = () => {
    while (
      this._articleIndex < this._articles.length && this._articleIndex < this._articlesShown
      ) {
      const article = this._articles[this._articleIndex];
      article.keywords = this._keywords;
      this._addCard(article);
      if (this._articleIndex + 1 === this._articles.length) {
        this._hideButton();
      }
      this._articleIndex++;
    }
  }

  _toggleLoader = () => {
    if (!this._preloader.classList.contains('preloader_visible')) {
      this._preloader.classList.add('preloader_visible');
    } else {
      this._preloader.classList.remove('preloader_visible');
    }
  }

  _showNoresults = () => {
    this._hideButton();
    this._noResults.classList.add('no-results_visible');
  }

  _hideNoresults = () => {
    this._noResults.classList.remove('no-results_visible');
  }

  _renderError = () => {
    this._error.textContent = this._errorMessage;
  }

  clearList = () => {
    while (this._cardList.firstChild) {
      this._cardList.removeChild(this._cardList.firstChild);
    }
  }

  _showMore = () => {
    this._articlesShown += this._articlesShown;
    this.renderCards();
  }

  _hideButton = () => {
    this._button.classList.add('results__button_hidden');
  }

  _showButton = () => {
    this._button.classList.remove('results__button_hidden');
  }

  _addCard = (cardData) => {
    const card = this._createCard.create(cardData);
    this._cardList.append(card);
  }

  _setListener = () => {
    this._button.addEventListener('click', this._showMore);
  }
}