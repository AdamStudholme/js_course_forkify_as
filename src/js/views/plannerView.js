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
    return `<li class="planner_list-item ${plan.day}">
    <div>
      <div>${plan.day}</div>
      <div>${plan.date}</div>
      <div>image</div>
      <div>${plan.recipe}</div>
    </div>
  </li>`;
  }
}

export default new plannerView();
