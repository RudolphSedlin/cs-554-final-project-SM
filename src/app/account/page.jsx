'use client'
import '../globals.css';
import Link from 'next/link';
import {AuthProvider, AuthContext, useAuthContext} from '@/context/AuthContext';



export default async function account() {
    let {user} = useAuthContext();
    console.log(user);
    let userInfo = <div></div>;
    if (user != null) {
        try {
            const response = await fetch('/api/account', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: user.displayName
                })
            });
            const data = await response.json();
            if (data.success) {
                const dbUser = data.user;
                userInfo = <div>
                    <h1>{dbUser.username}'s Profile</h1>
                    <h2>Full Name: {dbUser.name.first} {dbUser.name.last}</h2>
                    <p>{dbUser.bio}</p>
                </div>;
            } else {
                console.error('Failed to fetch user:', data.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }
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