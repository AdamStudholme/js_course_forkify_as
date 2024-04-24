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

  addHandler;

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  _generateMarkup() {}
}

export default new plannerView();
