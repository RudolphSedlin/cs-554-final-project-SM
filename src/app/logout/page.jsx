'use client'
import {useRouter} from 'next/navigation';
import styles from '@/app/form.module.css';
import { loginUser, logoutUser } from '@/firebase/firebase';
import { useState } from 'react';
import { validStringNoId } from '@/helpers/valid2';
import { useAuthContext } from '@/context/AuthContext';
import { refreshPage } from '@/revalidate';

function logout() {
  const router = useRouter();
  const {user} = useAuthContext();
  if (user == null){
    return router.push('/');
  }
  
  const onClick = async (event) => {
    event.preventDefault();
    const { success, data } = await logoutUser();

    if (!success) {
        return console.log(data)
    }
    // else successful
    console.log(data);
    await refreshPage();
    return router.push('/');
  }
  return (
    <button className={styles.myButton} onClick = {onClick} type='submit'>
      Logout
    </button>
  );
}

export default logout;
