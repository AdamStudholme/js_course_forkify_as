import { state } from '../model.js';
import View from './View.js';
import icons from 'url:../../img/icons.svg';

class shoppingListView extends View {
  _parentElement = document.querySelector('.shopping-list__list');
  _errorMessage = `No recipes added to list yet. Find a recipe and to shopping!`;
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    console.log(this._data);

    return this._data
      .map(
        item =>
          `<li class="shopping-item">
                  <a class="shopping-item__link" href="#">
                    <div class="shopping-item__data">
                      <h4 class="shopping-item__name">
                        ${item.item}
                      </h4>
                      <p class="shopping-item__publisher">${
                        item.quantity !== null
                          ? item.quantity + ' ' + item.unit
                          : ''
                      }</p>
                    </div>
                  </a>
                </li> `
      )
      .join('');
  }
}

export default new shoppingListView();
