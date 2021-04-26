import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as firebase from 'firebase';

//
// Initial State...
//
const initialState = {
    userData: {},
  }

//
// Reducer...
//
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "setUserData":
            return {...state, userData: action.value };
        default:
            return state;
    }   
  }
//
// Store...
//
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export { store };
//
// Action Creators
//
const setUserData = (userData) => {
    return {
      type: "setUserData",
      value: userData
    };
  }

// action to watch firebase data
const watchUserData = () => {
    var userId = firebase.auth().currentUser.uid;
    return function(dispatch) {
      firebase.database().ref("users/" + userId).on("value", function(snapshot)
      { 
          var userData = snapshot.val();
          var actionSetUserData = setUserData(userData);
          dispatch(actionSetUserData);
      }, function(error) { console.log(error); });
    }
  };

  export { setUserData, watchUserData }