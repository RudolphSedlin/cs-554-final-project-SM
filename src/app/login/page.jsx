'use client'
import {useRouter} from 'next/navigation';
import { refreshPage } from '@/revalidate';
import styles from '@/app/form.module.css';
import { loginUser } from '@/firebase/firebase';
import { useState } from 'react';
import { validStringNoId } from '@/helpers/valid2';
import { useAuthContext } from '@/context/AuthContext';


function login() {
  const router = useRouter();
  const {user} = useAuthContext();
  if (user){
    return router.push('/');
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleForm = async (event) => {
    event.preventDefault();
    const confirmEmail = validStringNoId(email, { regex: /^\S+@\S+\.\S+$/ });
    const confirmPass = validStringNoId(password, { min: 12, max: 30 });
    const { success, data } = await loginUser(confirmEmail, confirmPass);

    if (!success) {
        console.log(data);
        return router.push('/login/error');
    }
    else{
      console.log(data);
      //await refreshPage();
      return router.push('/private');
    }
  }
  
  return (
    <form onSubmit={handleForm} className={styles.myform}>
      <div className='form-group'>
        <label className={styles.myLabel}>
          Email:
          <input className={styles.myInput} onChange={(e) => setEmail(e.target.value)} name='email' type='email' />
        </label>
      </div>
      <div className='form-group'>
        <label className={styles.myLabel}>
          Password:
          <input className={styles.myInput} onChange={(e) => setPassword(e.target.value)} name='password' type='password' />
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
