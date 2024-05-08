'use client'
import '../globals.css';
import Link from 'next/link';
import {AuthProvider, AuthContext, useAuthContext} from '@/context/AuthContext';



export default function account() {
  let {user} = useAuthContext();
  console.log(user);
return (
    <div>
        <ul className='navClass center'>
            <li className='nav'>
                <Link href={'/register'} hidden = {user}>Register</Link>
            </li>
            <li className='nav'>
                <Link href={'/login'}hidden = {user}>Login</Link>
            </li>
            <li className='nav'>
                <Link href={'/logout'} hidden = {!user}>Logout</Link>
            </li>
        </ul>
    </div>

);
}