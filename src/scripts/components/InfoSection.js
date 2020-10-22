module.exports = class InfoSection {
  constructor (infoSectionProps) {
    this._userNameField = infoSectionProps.userName;
    this._articlesAmountField = infoSectionProps.articlesAmount;
    this._keywordsTarget = infoSectionProps.keywords;
    this._strings = infoSectionProps.strings;
  }

  render = (articlesAmount, keywords) => {
    this._setHeader(articlesAmount);
    this._setKeywords(keywords);
  }

  _setHeader = (articlesAmount) => {
    this._userNameField.textContent = localStorage.getItem('userName') + this._strings.youGot;
    if (articlesAmount.toString().endsWith(1)) {
      this._articlesAmount.textContent = articlesAmount + this._strings.one;
    }
    if (articlesAmount.toString().endsWith(2) || articlesAmount.toString().endsWith(3)) {
      this._articlesAmountField.textContent = articlesAmount + this._strings.two;
    } else {
      this._articlesAmountField.textContent = articlesAmount + this._strings.zero;
    }
  }

  _setKeywords(keywords) {
    this._keywords = Object.keys(keywords).sort(function(a, b) {
      return keywords[b] - keywords[a];
    })
    if (this._keywords.length === 1) {
      this._keywordsTarget.insertAdjacentHTML('afterend',
      `<p class="info__keywords">По ключевым словам: <span>${this._keywords[0]}</span></p>`
      )
    } if (this._keywords.length === 2) {
      this._keywordsTarget.insertAdjacentHTML('afterend',
      `<p class="info__keywords">По ключевым словам: <span>${this._keywords[0]}, ${this._keywords[1]}</span></p>`
      )
    } if (this._keywords.length === 3) {
      this._keywordsTarget.insertAdjacentHTML('afterend',
      `<p class="info__keywords">По ключевым словам: <span>${this._keywords[0]}, ${this._keywords[1]}, ${this._keywords[2]}</span></p>`
      )
    } if (this._keywords.length > 3) {
      this._keywordsTarget.insertAdjacentHTML('afterend',
      `<p class="info__keywords">По ключевым словам: <span>${this._keywords[0]}, ${this._keywords[1]}</span> и <span>${this._keywords.length - 2} другим</span></p>`
      );
    }

  }
}