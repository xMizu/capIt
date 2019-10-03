import {combineReducers} from 'redux';

let defaultState = {
  user: null,
  errors: '',
  isLoading: false,
  token: '',
  login: false,
  expenses: [],
  allCategories: [],
  categories: [],
  savings: [],
  balance: 0,
  incomes: [],
  deadSavings: [],
};

function fetchUser(state = defaultState.user, action) {
  switch (action.type) {
    case 'GET_USER':
      return action.payload;
    case 'REMOVE_USER':
      return null;
    default:
      return state;
  }
}

function setExpenses(state = defaultState.expenses, action) {
  switch (action.type) {
    case 'EXPENSES':
      return action.payload;
    case 'NO_EXPENSES':
      return [];
    default:
      return state;
  }
}

function deadSavingsHandler(state = defaultState.deadSavings, action) {
  switch (action.type) {
    case 'DEAD_SAVINGS':
      return action.payload;
    case 'NO_DEAD_SAVINGS':
      return [];
    default:
      return state;
  }
}

function loggedIn(state = defaultState.login, action) {
  switch (action.type) {
    case 'LOGIN':
      return true;
    case 'LOGOUT':
      return false;
    default:
      return state;
  }
}

const loader = (state = defaultState.isLoading, action) => {
  switch (action.type) {
    case 'LOADING':
      return true;
    case 'DONE_LOADING':
      return false;
    default:
      return state;
  }
};

const errorHandler = (state = defaultState.errors, action) => {
  switch (action.type) {
    case 'ERROR':
      return action.payload;
    case 'NO_ERROR':
      return '';
    default:
      return state;
  }
};

const allCategoriesHandler = (state = defaultState.allCategories, action) => {
  switch (action.type) {
    case 'ALL_CATEGORIES':
      return action.categories;
    case 'NO_ALL_CATEGORIES':
      return [];
    default:
      return state;
  }
};

const categoriesHandler = (state = defaultState.categories, action) => {
  switch (action.type) {
    case 'CATEGORIES':
      return action.payload;
    case 'NO_CATEGORIES':
      return [];
    default:
      return state;
  }
};

const savingsHandler = (state = defaultState.savings, action) => {
  switch (action.type) {
    case 'SAVINGS':
      return action.payload;
    case 'NO_SAVINGS':
      return [];
    default:
      return state;
  }
};

const incomehandler = (state = defaultState.incomes, action) => {
  switch (action.type) {
    case 'INCOMES':
      return action.payload;
    case 'NO_INCOMES':
      return [];
    default:
      return state;
  }
};

const tokenHandler = (state = defaultState.token, action) => {
  switch (action.type) {
    case 'TOKEN':
      return action.payload;
    case 'NO_TOKEN':
      return '';
    default:
      return state;
  }
};

const balanceHandler = (state = defaultState.balance, action) => {
  switch (action.type) {
    case 'BALANCE':
      return action.payload;
    case 'NO_BALANCE':
      return 0;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: fetchUser,
  isLoading: loader,
  errors: errorHandler,
  token: tokenHandler,
  login: loggedIn,
  expenses: setExpenses,
  categories: categoriesHandler,
  allCategories: allCategoriesHandler,
  savings: savingsHandler,
  balance: balanceHandler,
  incomes: incomehandler,
  deadSavings: deadSavingsHandler,
});

export default rootReducer;
