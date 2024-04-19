import View from './View.js';
import icons from 'url:../../img/icons.svg';

class SearchView extends View {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const search = {
      search: this._parentElement.querySelector('.search__field').value,
      maxDuration: this._parentElement.querySelector('.search-max-duration')
        .value,
      maxIngredients: this._parentElement.querySelector(
        '.search-max-ingredients'
      ).value,
    };
    this._clearInput();
    return search;
  }

  _clearInput() {
    this._parentElement.querySelector('.search-max-ingredients').value =
      this._parentElement.querySelector('.search-max-duration').value =
      this._parentElement.querySelector('.search__field').value =
        '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
