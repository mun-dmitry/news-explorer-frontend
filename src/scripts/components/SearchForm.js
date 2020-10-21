module.exports = class SearchForm {
  constructor(searchFormProps, sendRequest) {
    this._view = searchFormProps.form;
    this._input = searchFormProps.input;
    this._errorMessage = searchFormProps.errorMessage;
    this._button = searchFormProps.button;
    this._sendRequest = sendRequest;
  }

  _checkValidity = () => {
    const error = this._view.querySelector('.error');
    if (!this._input.checkValidity()) {
      error.classList.add('error_visible');
      error.textContent = this._errorMessage;
      return false;
    } else {
      error.textContent = '';
      error.classList.remove('error_visible');
      return true;
    }
  }

  getNews = (event) => {
    event.preventDefault();
    if (this._checkValidity()) {
      this._sendRequest(this._input.value);
    } else {
      this._setListener();
    }
  }

  _setListener = () => {
    this._input.addEventListener('_input', this._checkValidity);
  }
}