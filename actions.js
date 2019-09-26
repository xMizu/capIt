import AsyncStorage from '@react-native-community/async-storage';
import Savings from './components/Savings';

const URL = 'http://localhost:3000';

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
        debugger;
        AsyncStorage.setItem('id_token', resp.token);
        dispatch({type: 'LOGIN'});
        dispatch({type: 'TOKEN', payload: resp.token});
        dispatch({type: 'EXPENSES', payload: resp.user.expenses});
        dispatch({type: 'GET_USER', payload: resp.user});
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
        dispatch({type: 'GET_USER', payload: resp});
        dispatch({type: 'BALANCE', payload: resp.balance});
        dispatch({type: 'EXPENSES', payload: resp.expenses});
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
      dispatch({type: 'CATEGORIES', categories});
      dispatch({type: 'DONE_LOADING'});
    });
};

const logout = dispatch => {
  return () => {
    dispatch({type: 'LOGOUT'});
    dispatch({type: 'NO_TOKEN'});
    dispatch({type: 'REMOVE_USER'});
  };
};

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
        dispatch({type: 'SAVINGS', payload: data});
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
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: user,
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
};
