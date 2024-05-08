'use client'
 
import React, {useContext, useState} from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from '@/app/form.module.css';
import {useFormState as useFormState} from 'react-dom';
import { createUser } from '../actions';
const initialState = {
  message: null
};

function register() {
  
  const [state, formAction] = useFormState(createUser, initialState);

  return (
    <form action = {formAction} className={styles.myform}>
      {state && state.message}
      <div className='form-group'>
        <label className={styles.myLabel}>
          First Name:
          <input className={styles.myInput} name='firstName' type='text' />
        </label>
        <br />
      </div>
      <div className='form-group'>
        <label className={styles.myLabel}>
          Last Name:
          <input className={styles.myInput} name='lastName' type='text' />
        </label>
      </div>
      <div className='form-group'>
        <label className={styles.myLabel}>
          Username:
          <input className={styles.myInput} name='username' type='text' />
        </label>
      </div>
      <div className='form-group'>
        <label className={styles.myLabel}>
          Email:
          <input className={styles.myInput} name='email' type='email' />
        </label>
      </div>
      <div className='form-group'>
        <label className={styles.myLabel}>
          Password:
          <input className={styles.myInput} name='passwordOne' type='password' />
        </label>
      </div>
      <div className='form-group'>
        <label className={styles.myLabel}>
          Confirm Password:
          <input className={styles.myInput} name='passwordTwo' type='password' />
        </label>
      </div>
      <div className='form-group'>
        <button className={styles.myButton} type='submit'>
          Register
        </button>
      </div>
    </form>
  );
}

export default register;
