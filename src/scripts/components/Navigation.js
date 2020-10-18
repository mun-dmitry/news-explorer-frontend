module.exports = class Navigation {
  constructor (template) {
    this._template = template;
  }

  create = () => {
    this._view = this._template.content.cloneNode(true).children[0];
    return this._view;
  }

}