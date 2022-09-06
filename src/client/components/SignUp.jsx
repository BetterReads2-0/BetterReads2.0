import React, { useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
 import InputField from './InputField.jsx';
//import { signUp } from '../actions/actions';
//import '../../styles/SignUp.scss'

const SignUp = ()=> {
  const usernameRef = useRef(null);
  //declare passwordRef assign to useRef(null)
  const passwordRef = useRef(null);
  const emailRef = useRef(null);

  return(
    <div>
      <h1>Sign Up</h1>
      <InputField id='username' label='Username: ' ref={usernameRef}/>
      <InputField id='password' label='Password: ' inputType='password' ref={passwordRef} />
      <InputField id='email' label='Email: ' ref={emailRef}/>
      <button>Sign Up</button>
    </div>
  )
}
export default SignUp;