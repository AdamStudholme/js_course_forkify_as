//File that contains all the global variables for the project are required throughout the project
export const FORK_API_KEY =
  process.env.FORK_API_KEY || 'd71220a1-064c-42db-b362-e5849593d47c';

//API key for Spoonacular, API stored in 1Password and Netlify
export const SPOON_API_KEY = process.env.SPOON_API_KEY;
// https://forkify-api.herokuapp.com/v2
//recipe API url root
export const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';

export const SPOON_ANALYZE_POST_URL = `https://api.spoonacular.com/recipes/analyze?language=en&includeNutrition=true`;

export const TIMEOUT_SEC = 10;
export const RESULTS_PAGINATION = 10;
export const MODAL_CLOSE_SEC = 2.5;
