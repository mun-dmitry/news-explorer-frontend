export class Popup {
  constructor (templates, parentObject, createForm, api, header) {
    this._templates = templates;
    this._parentObject = parentObject;
    this._createForm = createForm();
    this._api = api;
    this._header = header;
  }

  _setContent = (target) => {
    let content;
    let contentType;
    if (target.classList.contains('header__bordered-button')) {
      if (target.innerText === 'Авторизоваться') {
        contentType = 'login';
        this._form = this._createForm;
        content = this._form.create(contentType);
      } else {
        console.log('Деавторизация');
      }
    }
    if (target.classList.contains('popup__link')) {
      if (target.innerText === 'Зарегистрироваться') {
        contentType = 'registration';
        this._form = this._createForm;
        content = this._form.create(contentType);
      }
      if (target.innerText === 'Войти') {
        contentType = 'login';
        this._form = this._createForm;
        content = this._form.create(contentType);
      }
    }

    this._contentType = contentType;
    this._view.append(content);
  }

  _switchContent = (event) => {
    this._clearContent();
    this._setContent(event.target);
    this._setHandlers(this._contentType);
  }

  _showSuccess = () => {
    this._contentType = 'success';
    this._clearContent();
    this._view.append(this._templates.success.content.cloneNode(true).children[0]);
    this._setHandlers(this._contentType);
  }

  _clearContent = () => {
    this._view.innerHTML = '';
  }

  open = (event) => {
    if (event.target.parentNode.classList.contains('header__buttons-container_mobile')) {
      this._header.hideView();
    }
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

  _renderHeader = () => {
    this._api.getUserData()
      .then((data) => {
        localStorage.setItem('userName', data.data.name);
        this._header.render(localStorage);
      })
      .catch((error) => error.json());
  }

  _sendData = () => {
    this._view.querySelector('.popup__button').setAttribute('disabled', true);
    const data = this._form.getInfo();
    if (this._contentType === 'login') {
      this._api.signin(data)
      .then((data) => {
        this._view.querySelector('.popup__button').removeAttribute('disabled');
        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', 'true');
        this._form.clear();
        this._renderHeader();
        this._close();
      })
      .catch((error) => error.json())
      .then((errRes) => this._form.setServerError(errRes));
    }
    if (this._contentType === 'registration') {
      this._api.signup(data)
      .then((data) => {
        this._view.querySelector('.popup__button').removeAttribute('disabled');
        this._showSuccess();
      })
      .catch((error) => error.json())
      .then((errRes) => this._form.setServerError(errRes));
    }
  }

  _setHandlers = (contentType) => {
      if (contentType === 'login' || contentType === 'registration') {
        this._view.querySelector('.popup__button').addEventListener('click', this._sendData);
      }
      this._view.querySelector('.popup__link').addEventListener('click', this._switchContent);
      this._view.querySelector('.popup__close').addEventListener('click', this._close);

    this._view.addEventListener('click', this._onOutsideClickCloser);
    this._parentObject.addEventListener('keydown', this._onEscCloser);
  }
}