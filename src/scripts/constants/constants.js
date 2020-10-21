const TEMPLATES = {
  popup: document.querySelector('#popup-template'),
  login: document.querySelector('#login-template'),
  registration: document.querySelector('#registration-template'),
  success: document.querySelector('#success-template'),
  header: document.querySelector('#header-template'),
  cardList: document.querySelector('#cardlist-template'),
  card: document.querySelector('#card-template'),
};

const REGEXPS = {
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.([a-zA-Z0-9-]+)+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
};

const ERROR_MESSAGES = {
  emptyInput: 'Это обязательное поле',
  wrongLength: 'Должно быть от 6 до 30 символов',
  emailTypeMismatch: 'Неверный формат email',
  passwordMismatch: 'Пароль должен содержать не менее 6 символов, из которых не менее 1 цифры, не менее 1 строчной и 1 заглавной буквы. Пароль может содержать только буквы латинского алфавита и цифры',
};

const PAGE_ELEMENTS = {
  page: document.querySelector('.page'),
  authorizeButton: document.querySelector('.header__bordered-button'),
  navigationButton: document.querySelector('.header__menu-button'),
  articlesButton: document.querySelector('.articles-link'),
  logoutButton: document.querySelector('.logout'),
  overlay: document.querySelector('.overlay'),
  searchButton: document.querySelector('.search__button'),
  searchForm: document.querySelector('.search__form'),
  searchInput: document.querySelector('.search__input'),
  buttonsContainer: document.querySelector('.header__buttons-container'),
};

const HEADER_PROPS = {
  articlesButton: PAGE_ELEMENTS.articlesButton,
  logoutButton: PAGE_ELEMENTS.logoutButton,
  authorizeButton: PAGE_ELEMENTS.authorizeButton,
  buttonsContainer: PAGE_ELEMENTS.buttonsContainer,
  overlay: PAGE_ELEMENTS.overlay,
};

const SEARCH_FORM_PROPS = {
  form: PAGE_ELEMENTS.searchForm,
  input: PAGE_ELEMENTS.searchInput,
  button: PAGE_ELEMENTS.searchButton,
  errorMessage: 'Нужно ввести ключевое слово',
};

const CARDLIST_PROPS = {
  template: TEMPLATES.cardList,
  parentObject: document.querySelector('.results'),
  errorMessage: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
  sectionTitleText: 'Результаты поиска',
  articlesShown: 3,
};

module.exports = {
  TEMPLATES,
  REGEXPS,
  ERROR_MESSAGES,
  PAGE_ELEMENTS,
  HEADER_PROPS,
  SEARCH_FORM_PROPS,
  CARDLIST_PROPS,
};
