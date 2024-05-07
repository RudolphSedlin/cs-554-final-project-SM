'use client'
 
import { useRouter } from 'next/navigation'
import React, {useContext, useState} from 'react';
import { createUserDB } from '../../helpers/db';
import {AuthContext} from '../context/AuthContext';

function register() {
  const {currentUser} = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState('');
  const router = useRouter()
  const handleSignUp = async (e) => {
    e.preventDefault();
    const {firstName, lastName, username, email, passwordOne, passwordTwo} = e.target.elements;
    if (passwordOne.value !== passwordTwo.value) {
      setPwMatch('Passwords do not match');
      return false;
    }

    try {
      await createUserDB(
        firstName.value,
        lastName.value,
        username.value,
        email.value,
        passwordOne.value,
        'testbio', 'testpic'
      );
    } catch (error) {
      alert(error);
    }
  };

  if (currentUser) {
    return router.push('/');
  }

  return (
    <div className='card'>
      <h1>Sign up</h1>
      {pwMatch && <h4 className='error'>{pwMatch}</h4>}
      <form onSubmit={handleSignUp}>
        <div className='form-group'>
          <label>
            First Name:
            <br />
            <input
              className='form-control'
              required
              name='firstName'
              type='text'
              placeholder='Name'
              autoFocus={true}
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            Last Name:
            <br />
            <input
              className='form-control'
              required
              name='lastName'
              type='text'
              placeholder='Name'
              autoFocus={true}
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
           Username:
            <br />
            <input
              className='form-control'
              required
              name='username'
              type='text'
              placeholder='Name'
              autoFocus={true}
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            Email:
            <br />
            <input
              className='form-control'
              required
              name='email'
              type='email'
              placeholder='Email'
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            Password:
            <br />
            <input
              className='form-control'
              id='passwordOne'
              name='passwordOne'
              type='password'
              placeholder='Password'
              autoComplete='off'
              required
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            Confirm Password:
            <br />
            <input
              className='form-control'
              name='passwordTwo'
              type='password'
              placeholder='Confirm Password'
              autoComplete='off'
              required
            />
          </label>
        </div>
        <button
          className='button'
          id='submitButton'
          name='submitButton'
          type='submit'
        >
          Sign Up
        </button>
      </form>
      <br />

    </div>
  );
}

export default register;
