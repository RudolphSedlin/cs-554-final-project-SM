'use client'
 
import React, {useContext, useState} from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from '@/app/form.module.css';
import {useFormState as useFormState} from 'react-dom';
import { loginUser } from '../actions';
const initialState = {
  message: null
};

function login() {
  
  const [state, formAction] = useFormState(loginUser, initialState);

  return (
    <form action = {formAction} className={styles.myform}>
      {state && state.message}
      <div className='form-group'>
        <label className={styles.myLabel}>
          Email:
          <input className={styles.myInput} name='email' type='email' />
        </label>
      </div>
      <div className='form-group'>
        <label className={styles.myLabel}>
          Password:
          <input className={styles.myInput} name='password' type='password' />
        </label>
      </div>
      <div className='form-group'>
        <button className={styles.myButton} type='submit'>
          Login
        </button>
      </div>
    </form>
  );
}

export default login;
