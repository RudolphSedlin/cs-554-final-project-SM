'use client'
 
import React, {useContext, useState} from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../context/AuthContext';
import styles from '@/app/form.module.css';
import {useFormState as useFormState} from 'react-dom';
import { createUser } from '../actions';
const initialState = {
  message: null
};

function register() {
  const router = useRouter();
  const {user} = useAuthContext();
  if (user){
    return router.push('/');
  }
  const [state, formAction] = useFormState(createUser, initialState);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');

  const handleForm = async (event) => {
		event.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          passwordOne: passwordOne,
          passwordTwo: passwordTwo
        })
      });
      const data = await response.json();
      if (data.success) {
        router.push('/login');
      } else {
        console.error('Failed to register user1:', data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
	};


  return (
    <form onSubmit={handleForm} className={styles.myform}>
      <div className='form-group'>
        <label className={styles.myLabel}>
          First Name:
          <input className={styles.myInput} onChange={(e) => setFirstName(e.target.value)} name='firstName' type='text' />
        </label>
        <br />
      </div>
      <div className='form-group'>
        <label className={styles.myLabel}>
          Last Name:
          <input className={styles.myInput} onChange={(e) => setLastName(e.target.value)}name='lastName' type='text' />
        </label>
      </div>
      <div className='form-group'>
        <label className={styles.myLabel}>
          Username:
          <input className={styles.myInput} onChange={(e) => setUsername(e.target.value)} name='username' type='text' />
        </label>
      </div>
      <div className='form-group'>
        <label className={styles.myLabel}>
          Email:
          <input className={styles.myInput} onChange={(e) => setEmail(e.target.value)} name='email' type='email' />
        </label>
      </div>
      <div className='form-group'>
        <label className={styles.myLabel}>
          Password:
          <input className={styles.myInput} onChange={(e) => setPasswordOne(e.target.value)} name='passwordOne' type='password' />
        </label>
      </div>
      <div className='form-group'>
        <label className={styles.myLabel}>
          Confirm Password:
          <input className={styles.myInput} onChange={(e) => setPasswordTwo(e.target.value)} name='passwordTwo' type='password' />
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
