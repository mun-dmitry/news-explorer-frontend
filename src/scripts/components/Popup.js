module.exports = class Popup {
  constructor (templates, parentObject, creators) {
    this._templates = templates;
    this._parentObject = parentObject;
    this._createForm = creators.form();
    this._createNavigation = creators.navigation();
  }

  _setContent = (target) => {
    let content;
    let contentType;
    if (target.classList.contains('header__bordered-button')) {
      if (target.innerText === 'Авторизоваться') {
        contentType = 'login';
        content = this._createForm.create(contentType);
      } else {
        console.log('Деавторизация');
      }
    }
    if (target.classList.contains('popup__link')) {
      if (target.innerText === 'Зарегистрироваться') {
        contentType = 'registration';
        content = this._createForm.create(contentType);
      }
      if (target.innerText === 'Войти') {
        contentType = 'login';
        content = this._createForm.create(contentType);
      }
    }
    if (target.classList.contains('header__menu-button')) {
      contentType = 'navigation';
      content = this._createNavigation.create();
    }

    this._contentType = contentType;
    this._view.append(content);
  }

  _switchContent = (event) => {
    this._clearContent();
    this._setContent(event.target);
    this._setHandlers(this._contentType);
  }

  _clearContent = () => {
    this._view.innerHTML = '';
  }

  open = (event) => {
    this._view = this._templates.popup.content.cloneNode(true).children[0];
    this._view.classList.add('popup_is-opened');
    this._parentObject.append(this._view);
    const target = event.target;
    this._setContent(target);
    this._setHandlers(this._contentType);
  }

  _close = () => {
    this._view.remove();
  }

  _onEscCloser = (event) => {
    if (event.keyCode == 27) {
        this._close();
    }
  }

  _onOutsideClickCloser = (event) => {
    if (event.target.classList.contains('popup')) {
      this._close();
    }
  }

  _setHandlers = (contentType) => {
    if (contentType !== 'navigation') {
      if (contentType === 'login' || contentType === 'registration') {
        this._view.querySelector('.popup__link').addEventListener('click', this._switchContent);
      }
      this._view.querySelector('.popup__close').addEventListener('click', this._close);
    } else {
      this._view.querySelector('.header__bordered-button').addEventListener('click', this._switchContent);
    }

    this._view.addEventListener('click', this._onOutsideClickCloser);
    this._parentObject.addEventListener('keydown', this._onEscCloser);
  }

}