//File that contains all the global variables for the project are required throughout the project
//recipe API url root
// https://forkify-api.herokuapp.com/v2
export const keys = (async () => {
  const key = await import('./notForProd');
  return {
    FORK_API_KEY: process.env.FORK_API_KEY || key.forkKey,
    SPOON_API_KEY: process.env.SPOON_API_KEY || key.spoonKey,
  };
})();

export const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';

export const SPOON_ANALYZE_POST_URL = `https://api.spoonacular.com/recipes/analyze?language=en&includeNutrition=true`;

export const TIMEOUT_SEC = 10;
export const RESULTS_PAGINATION = 10;
export const MODAL_CLOSE_SEC = 2.5;
export const DAYS_ARRAY = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
