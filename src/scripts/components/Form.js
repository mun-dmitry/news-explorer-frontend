module.exports = class Form {
  constructor (loginTemplate, registrationTemplate, formValidatorCreator) {
    this._loginTemplate = loginTemplate;
    this._registrationTemplate = registrationTemplate;
    this._createFormValidator = formValidatorCreator;
  }

  create = (formType) => {
    if (formType === 'login') {
      this._view = this._loginTemplate.content.cloneNode(true).children[0];
    }
    if (formType === 'registration') {
      this._view = this._registrationTemplate.content.cloneNode(true).children[0];
    }
    const formValidator = this._createFormValidator(this._view.querySelector('form'));
    formValidator.setSubmitButtonState();
    formValidator.setEventListeners();
    return this._view;
  }

  setServerError = () => {

  }

  _clear = () => {

  }

  _getInfo = () => {

  }
}