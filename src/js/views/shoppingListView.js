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

  addHandlerMarkComplete(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const item = e.target.closest('.shopping-item');
      if (!item) return;
      console.log(item.dataset.itemId);
      handler(item.dataset.itemId);
    });
  }

  addHandlerHideComplete(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.shopping-list__hide-complete');
      if (!btn) return;
      handler();
    });
  }
  addHandlerClearList(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.shopping-list__clear');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    const listBtnsMarkup = `
    <div class="shopping-list__controls ${!this._data ? 'hidden' : ''}">
      <div>        
        <button class="btn shopping-list__btn shopping-list__hide-complete">         
          Hide Completed
        </button>
      </div>
      <div>        
        <button class="btn shopping-list__btn shopping-list__clear">    
          Clear List 
        </button>
      </div>     
    </div>
    `;
    return (
      listBtnsMarkup +
      this._data
        .map(
          item =>
            `<li class="shopping-item" data-item-id="${item.id}">
                  <a class="shopping-item__link" href="">
                    <div class="shopping-item__data ${
                      item.purchased ? 'shopping-item__purchased' : ''
                    }" title="${item.item}">
                      <p class="shopping-item__quantity">${
                        item.quantity !== null
                          ? item.quantity +
                            ' ' +
                            (item.unit !== null ? item.unit : '')
                          : ''
                      }</p>
                      <h4 class="shopping-item__name">
                        ${item.item}
                      </h4>
                      <input type="checkbox" ${
                        item.purchased ? 'checked' : ''
                      } class="shopping-checkbox">                        
                    </div>
                  </a>
                </li> `
        )
        .join('')
    );
  }
}

export default new shoppingListView();
