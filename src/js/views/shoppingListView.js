import { state } from '../model.js';
import View from './View.js';
import icons from 'url:../../img/icons.svg';

class shoppingListView extends View {
  _parentElement = document.querySelector('');
  _errorMessage = `Error loading pagination.`;
  _message = '';

  addHandlerAddIngredients(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
    });
  }

  _generateMarkup() {}
}

export default new shoppingListView();
