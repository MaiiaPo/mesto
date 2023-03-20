/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
export default class Section {
  constructor({ renderer }, selector) {
    this._container = document.querySelector(selector);
    this._renderer = renderer;
  }

  renderItems(items, isAppend) {
    items.forEach((item) => {
      this._renderer(item, isAppend);
    });
  }

  setItem(element, isAppend) {
    if (isAppend) {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}
