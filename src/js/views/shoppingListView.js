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
    return this._data
      .map(
        item =>
          `<li class="preview">
                  <a class="preview__link" href="#23456">
                    <figure class="preview__fig">
                      <img src="src/img/test-1.jpg" alt="Test" />
                    </figure>
                    <div class="preview__data">
                      <h4 class="preview__name">
                        Pasta with Tomato Cream ...
                      </h4>
                      <p class="preview__publisher">The Pioneer Woman</p>
                    </div>
                  </a>
                </li> `
      )
      .join('');
  }
}

export default new shoppingListView();
