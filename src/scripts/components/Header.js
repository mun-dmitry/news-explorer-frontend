export class Header {
  constructor (headerProps) {
    this._articlesButton = headerProps.articlesButton;
    this._logoutButton = headerProps.logoutButton;
    this._authorizeButton = headerProps.authorizeButton;
    this._buttonsContainer = headerProps.buttonsContainer;
    this._overlay = headerProps.overlay;
  }

  render = (props) => {
    if (props.isLoggedIn === 'false') {
      this._articlesButton.classList.add('header__button_hidden');
      this._logoutButton.classList.add('header__button_hidden');
      this._authorizeButton.classList.remove('header__button_hidden');
    } else {
      if(this._articlesButton) {this._articlesButton.classList.remove('header__button_hidden')}
      if (this._authorizeButton) {this._authorizeButton.classList.add('header__button_hidden');}
      this._logoutButton.querySelector('span').textContent = props.userName;
      this._logoutButton.classList.remove('header__button_hidden');
    }
  }

  showMobileView = () => {
    this._buttonsContainer.classList.add('header__buttons-container_mobile');
    this._overlay.classList.add('overlay_visible');
    this._setHandlers();

  }

  hideView = () => {
    this._buttonsContainer.classList.remove('header__buttons-container_mobile');
    this._overlay.classList.remove('overlay_visible');
  }

  _setHandlers = () => {
    this._overlay.addEventListener('click', this.hideView);
    this._logoutButton.addEventListener('click', this.hideview);
  }
}