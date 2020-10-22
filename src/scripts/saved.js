import '../styles/saved.css';
import { Header } from './components/Header';
import { MainApi } from './api/MainApi';
import { InfoSection } from './components/InfoSection';
import { NewsCardList } from './components/NewsCardList';
import { NewsCard } from './components/NewsCard';
import { dateConverter } from './utils/dateConverter';
import { logOut } from './utils/logOutFunction';
import { MAIN_API_CONFIG } from './constants/config';
import {
  TEMPLATES,
  PAGE_ELEMENTS,
  HEADER_PROPS,
  INFO_SECTION_PROPS,
  CARDLIST_PROPS,
} from './constants/constants';

if (localStorage.isLoggedIn === 'false') {
  location.href = 'index.html';
}

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
  })
  .catch((error) => error.json());

PAGE_ELEMENTS.navigationButton.addEventListener('click', header.showMobileView);
PAGE_ELEMENTS.logoutButton.onclick = logOut;
