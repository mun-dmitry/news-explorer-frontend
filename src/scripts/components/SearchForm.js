export class SearchForm {
  constructor(searchFormProps, sendRequest) {
    this._view = searchFormProps.form;
    this._input = searchFormProps.input;
    this._errorMessage = searchFormProps.errorMessage;
    this._placeholderMessage = searchFormProps.placeholderMessage;
    this._button = searchFormProps.button;
    this._sendRequest = sendRequest;
  }

  _checkValidity = () => {
    if (!this._input.checkValidity()) {
      this._input.placeholder = this._errorMessage;
      return false;
    } else {
      this._input.placeholder = this._placeholderMessage;
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