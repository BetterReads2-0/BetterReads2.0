/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';

import '../../styles/InputField.scss';

const InputField = forwardRef((props, ref) => {
  const inputType = !props.inputType ? props.inputType : 'text';

  return(
    <div className='input-field-container'>
      <label htmlFor={props.id} className='input-field-label'>{props.label} </label>
      <input id={props.id} type={props.inputType} ref={ref} className='input-field-input'/>
    </div>
  )
})

export default InputField;