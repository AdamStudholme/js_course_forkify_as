import { state } from '../model.js';
import View from './View.js';
import icons from 'url:../../img/icons.svg';

class plannerView extends View {
  _parentElement = document.querySelector('.planner');
  _window = document.querySelector('.view-planner-window');
  _overlay = document.querySelector('.planner-overlay');
  _btnOpen = document.querySelector('.nav__btn--view-planner');
  _btnClose = document.querySelector('.btn--planner-close-modal');

  _errorMessage = `Error loading planner.`;
  _message = 'Planner successfully updated.';

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('planner-hidden');
    this._window.classList.toggle('planner-hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerRenderPlanner(handler) {
    this._btnOpen.addEventListener('click', function (e) {
      handler();
    });
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  _generateMarkup() {
    return `
      <div>
        <ul class="planner__list">
        ${this._data.map(plan => this._generateMarkupPreview(plan)).join('')}
        </ul>
      </div>`;
  }

  _generateMarkupPreview(plan) {
    if (plan.recipe === null)
      return `<li class="planner__list-item" data-date=${plan.date.dateStr}>
    <div>${plan.date.dayOfWeek}</div>
    <div>${plan.date.dateStr}</div>
    <button class="planner__btn" title="add recipe from bookmarks">
      <svg class="planner__icon" >
        <use href="${icons}#icon-plus"></use>
      </svg>
    </button>
  </li>
  `;
    return `<li class="planner_list-item" data-date=${plan.date.dateStr}>
    <div>
      <div>${plan.date.dayOfWeek}</div>
      <div>${plan.date.dateStr}</div>
      <figure class="preview__fig">
      <img src="${plan.recipe.image}" alt="${plan.recipe.title}" />
    </figure>
      <div>${plan.recipe.title}</div>
      <div>Serves: ${plan.recipe.servings}</div>
    </div>
  </li>`;
  }
}

export default new plannerView();
