import { ActionTypes } from '../constants/ActionTypes';

export const signUp = (user) => ({ type: ActionTypes.ADD_USER, payload: { user } });

export const login = (username, email, feed) => ({ type: ActionTypes.LOGIN, payload: { username, firstName, lastName, email, feed } });


export const logOut = () => ({ type:ActionTypes.LOGOUT })

