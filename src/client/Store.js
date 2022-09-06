import { configureStore } from '@reduxjs/toolkit';

import reducer from './reducers/Reducers.js';

const store = configureStore({
  reducer,

})
export default store;