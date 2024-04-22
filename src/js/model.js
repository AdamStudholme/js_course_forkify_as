import { API_URL, SPOON_ANALYZE_POST_URL } from './config.js';
import { FORK_API_KEY } from './config.js';
import { RESULTS_PAGINATION } from './config.js';
// import { getJSON, sendJSON } from './helpers.js';
import { AJAX } from './helpers.js';
import { TIMEOUT_SEC } from './config.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PAGINATION,
  },
  bookmarks: [],
  shoppingList: [],
  filters: {
    hideCompleteShopping: false,
  },
  weeklyPlanner: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }), // using the spread opperator to conditionally add property depending on whether it exists or not.
  };
};

const loadRecipeNutrition = async function (incTaste = false) {
  try {
    const recipeDetails = {
      title: state.recipe.title,
      servings: state.recipe.servings,
      ingredients: state.recipe.ingredients.map(
        ing => `${ing.quantity} ${ing.unit} ${ing.description}`
      ),
      instructions: 'none',
    };
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': SPOON_API_KEY,
      },
      body: JSON.stringify(recipeDetails),
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // Use timeout function to throw error for a long load
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (Error ${res.status})`);

    state.recipe.calories = data.nutrition.nutrients[0];
    state.recipe.diets = {};
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${FORK_API_KEY}`);

    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    //Temp error handling
    console.error(`${err}  in Model💥💥`);
    throw err;
  }
  await loadRecipeNutrition();
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${FORK_API_KEY}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        servings: rec.servings,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  //return part of the state
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  //Add bookmark
  state.bookmarks.push(recipe);
  //mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};
export const deleteBookmark = function (id) {
  //Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  //mark current recipe as NOT  bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
  const shoppingListStorage = localStorage.getItem('shoppingList');
  if (shoppingListStorage) state.shoppingList = JSON.parse(shoppingListStorage);
};

init();

//Function for clearing bookmarks in development
const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(
        entry => entry[0].startsWith('ingredient') && entry[1].trim() !== ''
      )
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format.'
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

const persistShoppingList = function () {
  localStorage.setItem('shoppingList', JSON.stringify(state.shoppingList));
};

export const addIngredientsToList = function () {
  state.recipe.ingredients.forEach(ing => {
    const item = {
      id: self.crypto.randomUUID(),
      quantity: ing.quantity,
      unit: ing.unit,
      item: ing.description,
      purchased: false,
    };
    state.shoppingList.push(item);
    persistShoppingList();
    return state.shoppingList;
  });
};

export const toggleShoppingItem = function (itemId) {
  const item = state.shoppingList.find(i => i.id === itemId);
  item.purchased = !item.purchased;
  persistShoppingList();
};

export const ClearShoppingList = function () {
  state.shoppingList = [];
  persistShoppingList();
};

export const filterShoppingList = function () {
  state.filters.hideCompleteShopping = !state.filters.hideCompleteShopping;
  if (state.filters.hideCompleteShopping)
    return state.shoppingList.filter(item => !item.purchased);
  return state.shoppingList;
};
