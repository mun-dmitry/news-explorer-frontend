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
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.([a-zA-Z0-9-]{2,5})+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
};

const ERROR_MESSAGES = {
  emptyInput: 'Это обязательное поле',
  wrongLength: 'Должно быть от 6 до 30 символов',
  emailTypeMismatch: 'Неверный формат email',
  passwordMismatch: `Неверный формат пароля. Образец формата: '..s.7..A'`,
};

const PAGE_ELEMENTS = {
  page: document.querySelector('.page'),
  authorizeButton: document.querySelector('#authorize'),
  navigationButton: document.querySelector('.header__menu-button'),
  logoutButton: document.querySelector('#logout'),
  overlay: document.querySelector('.overlay'),
  searchButton: document.querySelector('.search__button'),
  searchForm: document.querySelector('.search__form'),
  searchInput: document.querySelector('.search__input'),
  buttonsContainer: document.querySelector('.header__buttons-container'),
};

const HEADER_PROPS = {
  articlesButton: document.querySelector('#articles-link'),
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
  placeholderMessage: 'Введите тему новости',
};

const CARDLIST_PROPS = {
  template: TEMPLATES.cardList,
  parentObject: document.querySelector('.results'),
  errorMessage: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
  sectionTitleText: 'Результаты поиска',
  articlesShown: 3,
};

const INFO_SECTION_PROPS = {
  userName: document.querySelector('#saved-articles-username'),
  articlesAmount: document.querySelector('#saved-articles-amount'),
  keywords: document.querySelector('.info__subtitle'),
  strings: {
    zero: ' сохранённых статей',
    one: ' сохранённая статья',
    two: ' сохранённые статьи',
    youGot: ', у вас ',
  },
};

export {
  TEMPLATES,
  REGEXPS,
  ERROR_MESSAGES,
  PAGE_ELEMENTS,
  HEADER_PROPS,
  SEARCH_FORM_PROPS,
  CARDLIST_PROPS,
  INFO_SECTION_PROPS,
};
