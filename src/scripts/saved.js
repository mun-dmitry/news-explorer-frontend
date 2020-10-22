import '../styles/saved.css';

const Header = require('./components/Header');
const MainApi = require('./api/MainApi');
const InfoSection = require('./components/InfoSection');
const NewsCardList = require('./components/NewsCardList');
const NewsCard = require('./components/NewsCard');
const dateConverter = require('./utils/dateConverter');
const logOut = require('./utils/logOutFunction');

const {
  TEMPLATES,
  PAGE_ELEMENTS,
  HEADER_PROPS,
  INFO_SECTION_PROPS,
  CARDLIST_PROPS,
} = require('./constants/constants');
const { MAIN_API_CONFIG } = require('./constants/config');

const header = new Header(HEADER_PROPS);
const infoSection = new InfoSection(INFO_SECTION_PROPS);
const mainApi = new MainApi(MAIN_API_CONFIG);
const createNewsCard = (arg) => new NewsCard(arg, TEMPLATES.card, dateConverter, mainApi);
const cardList = new NewsCardList(CARDLIST_PROPS, createNewsCard);

header.render(localStorage);
mainApi.getArticles()
  .then((data) => data.data)
  .then((data) => {
    let keyWords = [];
    data.forEach((article) => {
      keyWords.push(article.keyword);
    });
    keyWords = keyWords.reduce((acc, el) => {
      acc[el] = (acc[el] || 0) + 1;
      return acc;
    }, {});
    infoSection.render(data.length, keyWords);
    cardList.create();
    cardList.renderResults(data);
  });

PAGE_ELEMENTS.navigationButton.addEventListener('click', header.showMobileView);
PAGE_ELEMENTS.logoutButton.onclick = logOut;
