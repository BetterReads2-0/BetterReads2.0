import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './Store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './containers/App.jsx';
import SignUp from './components/SignUp.jsx';
import AddReview from './containers/AddReview.jsx';
import Feed from './containers/Feed.jsx';
import Reviews from './containers/Reviews.jsx';


const root = createRoot(document.getElementById('root'))

root.render(
  <Provider store={store} >
    <BrowserRouter>
    <Routes>
      <Route exact path='/signup' element={<SignUp />} />
      <Route path='/' element={<App />}>
        <Route path='/addreview' element={<AddReview />} />
        <Route path='/reviews' element={<Reviews />} />
        <Route path='/' element={<Feed />} />
      </Route>
    </Routes>
    </BrowserRouter>
  </Provider>
)