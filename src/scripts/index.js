import '../styles/index.css';

const Popup = require('./components/Popup');
const Form = require('./components/Form');
const FormValidator = require('./utils/FormValidator');
const Navigation = require('./components/Navigation');
const MainApi = require('./api/MainApi');
const {
  TEMPLATES, REGEXPS, ERROR_MESSAGES, PAGE_ELEMENTS,
} = require('./constants/constants');

const apiProps = {
  baseUrl: 'https://api.yapr-news-explorer.tk/',
};
const mainApi = new MainApi(apiProps);

const createFormValidator = (arg) => new FormValidator(arg, ERROR_MESSAGES, REGEXPS);
function createForm() {
  return new Form(TEMPLATES.login, TEMPLATES.registration, createFormValidator);
}
const createNavigation = () => new Navigation(TEMPLATES.navigation);
const creators = {
  form: createForm,
  navigation: createNavigation,
  validator: createFormValidator,
};

const popup = new Popup(TEMPLATES, PAGE_ELEMENTS.page, creators, mainApi);
PAGE_ELEMENTS.authorizeButton.addEventListener('click', popup.open);
PAGE_ELEMENTS.navigationButton.addEventListener('click', popup.open);
