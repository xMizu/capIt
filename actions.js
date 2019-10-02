import AsyncStorage from '@react-native-community/async-storage';

// const URL = 'http://localhost:3000';
const URL = 'https://desolate-ridge-78152.herokuapp.com';

const login = user => dispatch => {
  dispatch({type: 'LOADING'});
  return fetch(`${URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accepts: 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(resp => resp.json())
    .then(resp => {
      if (!resp.status) {
        AsyncStorage.setItem('id_token', resp.token);
        dispatch({type: 'LOGIN'});
        dispatch({type: 'TOKEN', payload: resp.token});
        dispatch({type: 'EXPENSES', payload: resp.user.expenses});
        dispatch({type: 'INCOMES', payload: resp.user.incomes});
        dispatch({type: 'CATEGORIES', payload: resp.user.categories});
        dispatch({type: 'GET_USER', payload: resp.user});
        dispatch({type: 'SAVINGS', payload: resp.user.savings});
        dispatch({type: 'NO_ERROR', payload: resp.message});
        AsyncStorage.getItem('id_token');
      } else {
        dispatch({type: 'ERROR', payload: resp.message});
      }
      dispatch({type: 'DONE_LOADING'});
    });
};

const signup = user => dispatch => {
  dispatch({type: 'LOADING'});
  return fetch(`${URL}/signup`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
  })
    .then(res => res.json())
    .then(resp => {
      if (!resp.status) {
        AsyncStorage.setItem('id_token', resp.token);
        dispatch({type: 'LOGIN'});
        dispatch({type: 'TOKEN', payload: resp.token});
        dispatch({type: 'EXPENSES', payload: resp.user.expenses});
        dispatch({type: 'INCOMES', payload: resp.user.incomes});
        dispatch({type: 'CATEGORIES', payload: resp.user.categories});
        dispatch({type: 'GET_USER', payload: resp.user});
        dispatch({type: 'SAVINGS', payload: resp.user.savings});
        dispatch({type: 'NO_ERROR', payload: resp.message});
        AsyncStorage.getItem('id_token');
      } else {
        dispatch({type: 'ERROR', payload: resp.message});
      }
      dispatch({type: 'DONE_LOADING'});
    });
};

const fetchUser = (arg, dispatch) => {
  return () => {
    dispatch({type: 'LOADING'});
    fetch(`${URL}/user`, {
      headers: {
        Authorization: arg,
        accept: 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        dispatch({type: 'BALANCE', payload: resp.balance});
        dispatch({type: 'GET_USER', payload: resp});
        dispatch({type: 'INCOMES', payload: resp.incomes});
        dispatch({type: 'SAVINGS', payload: resp.savings});
        dispatch({type: 'EXPENSES', payload: resp.expenses});
        dispatch({type: 'CATEGORIES', payload: resp.categories});
        dispatch({type: 'DONE_LOADING'});
      });
  };
};

const fetchCategories = dispatch => {
  dispatch({type: 'LOADING'});
  return fetch(`${URL}/categories`, {
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
  })
    .then(resp => resp.json())
    .then(categories => {
      console.log(categories);
      dispatch({type: 'ALL_CATEGORIES', categories});
      dispatch({type: 'DONE_LOADING'});
    });
};

const logout = dispatch => {
  return () => {
    dispatch({type: 'LOGOUT'});
    dispatch({type: 'NO_TOKEN'});
    dispatch({type: 'REMOVE_USER'});
    dispatch({type: 'NO_INCOMES'});
    dispatch({type: 'NO_BALANCE'});
    dispatch({type: 'NO_SAVINGS'});
    dispatch({type: 'NO_EXPENSES'});
    dispatch({type: 'NO_CATEGORIES'});
  };
};

const removeError = dispatch => () =>
  dispatch({
    type: 'NO_ERROR',
  });

const postExpense = user => dispatch => {
  dispatch({type: 'LOADING'});
  return fetch(`${URL}/expenses`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .then(data => {
      if (!data.status) {
        dispatch({type: 'EXPENSES', payload: data});
      } else {
        dispatch({type: 'ERROR', payload: data.message});
      }
      dispatch({type: 'DONE_LOADING'});
    });
};

const postSavings = saving => dispatch => {
  dispatch({type: 'LOADING'});
  return fetch(`${URL}/savings`, {
    method: 'POST',
    headers: {
      Authorization: saving.token,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(saving),
  })
    .then(res => res.json())
    .then(data => {
      if (!data.status) {
        dispatch({type: 'BALANCE', payload: data.balance});
        dispatch({type: 'GET_USER', payload: data});
        dispatch({type: 'INCOMES', payload: data.incomes});
        dispatch({type: 'SAVINGS', payload: data.savings});
        dispatch({type: 'EXPENSES', payload: data.expenses});
        dispatch({type: 'CATEGORIES', payload: data.categories});
        dispatch({type: 'NO_ERROR'});
      } else {
        dispatch({type: 'ERROR', payload: data.message});
      }
      dispatch({type: 'DONE_LOADING'});
    });
};

const postIncome = income => dispatch => {
  dispatch({type: 'LOADING'});
  return fetch(`${URL}/incomes`, {
    method: 'POST',
    headers: {
      Authorization: income.token,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(income),
  })
    .then(res => res.json())
    .then(data => {
      if (!data.status) {
        dispatch({type: 'BALANCE', payload: data.balance});
        dispatch({type: 'GET_USER', payload: data});
        dispatch({type: 'INCOMES', payload: data.incomes});
        dispatch({type: 'SAVINGS', payload: data.savings});
        dispatch({type: 'EXPENSES', payload: data.expenses});
        dispatch({type: 'CATEGORIES', payload: data.categories});
        dispatch({type: 'NO_ERROR'});
      } else {
        dispatch({type: 'ERROR', payload: data.message});
      }
      dispatch({type: 'DONE_LOADING'});
    });
};

const updateSavings = saving => dispatch => {
  dispatch({type: 'LOADING'});
  return fetch(`${URL}/savings`, {
    method: 'PATCH',
    headers: {
      Authorization: saving.token,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(saving),
  })
    .then(res => res.json())
    .then(data => {
      if (!data.status) {
        dispatch({type: 'BALANCE', payload: data.balance});
        dispatch({type: 'GET_USER', payload: data});
        dispatch({type: 'INCOMES', payload: data.incomes});
        dispatch({type: 'SAVINGS', payload: data.savings});
        dispatch({type: 'EXPENSES', payload: data.expenses});
        dispatch({type: 'CATEGORIES', payload: data.categories});
        dispatch({type: 'NO_ERROR'});
      } else {
        dispatch({type: 'ERROR', payload: data.message});
      }
      dispatch({type: 'DONE_LOADING'});
    });
};

const removeExpense = user => dispatch => {
  dispatch({type: 'LOADING'});
  console.log(user);
  return fetch(`${URL}/expenses/${user.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: user.token,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: user,
  })
    .then(res => res.json())
    .then(data => {
      if (!data.status) {
        dispatch({type: 'BALANCE', payload: data.balance});
        dispatch({type: 'GET_USER', payload: data});
        dispatch({type: 'INCOMES', payload: data.incomes});
        dispatch({type: 'SAVINGS', payload: data.savings});
        dispatch({type: 'EXPENSES', payload: data.expenses});
        dispatch({type: 'CATEGORIES', payload: data.categories});
        dispatch({type: 'NO_ERROR'});
      } else {
        dispatch({type: 'ERROR', payload: data.message});
      }
      dispatch({type: 'DONE_LOADING'});
    });
};

const removeIncome = user => dispatch => {
  dispatch({type: 'LOADING'});
  console.log(user);
  return fetch(`${URL}/incomes/${user.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: user.token,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: user,
  })
    .then(res => res.json())
    .then(data => {
      if (!data.status) {
        dispatch({type: 'BALANCE', payload: data.balance});
        dispatch({type: 'GET_USER', payload: data});
        dispatch({type: 'INCOMES', payload: data.incomes});
        dispatch({type: 'SAVINGS', payload: data.savings});
        dispatch({type: 'EXPENSES', payload: data.expenses});
        dispatch({type: 'CATEGORIES', payload: data.categories});
        dispatch({type: 'NO_ERROR'});
      } else {
        dispatch({type: 'ERROR', payload: data.message});
      }
      dispatch({type: 'DONE_LOADING'});
    });
};

const getToken = token => dispatch => dispatch({type: 'TOKEN', payload: token});

export {
  login,
  logout,
  fetchUser,
  getToken,
  fetchCategories,
  postExpense,
  removeExpense,
  postSavings,
  updateSavings,
  signup,
  removeError,
  postIncome,
  removeIncome,
};
