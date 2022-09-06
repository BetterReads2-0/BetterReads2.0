
import { ActionTypes } from '../constants/ActionTypes.js';

//declaring intial state 
const intialState = {
  username: '',
  email: '',
  feed: {},
  reviews: {},
  loginStatus: false
};

const UserReducer = (state = intialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN: {
      //deconstruct the action payload 
      const { username, email, feed } = action.payload;
      //console.log('LOGIN', action.payload);
      return {
        ...state,
        username: username,
        email: email,
        feed: feed,
        loginStatus: true,
      };

    }
  
  case ActionTypes.LOGOUT:
    return {
      ...state,
      loginStatus: false,
    };

  default:
    return state;
  }
};

export default UserReducer;