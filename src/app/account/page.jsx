'use client'
import '../globals.css';
import Link from 'next/link';
import {AuthProvider, AuthContext, useAuthContext} from '@/context/AuthContext';
import { useState, useEffect } from 'react';



export default function account() {
    let {user} = useAuthContext();
    console.log(user);
    const [dbUser, setDBUser] = useState(null);
    if (user != null) {
        useEffect(() => {
            async function fetchUser() {
                try {
                    const response = await fetch('/api/account', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: user.displayName
                        })
                    });
                    const data = await response.json();
                    console.log(data.user);
                    if (data.success) {
                        setDBUser(data.user);
                    } else {
                        console.error('Failed to fetch user:', data.message);
                    }
                } catch (error) {
                    console.error('Error submitting form:', error);
                }
            }
            fetchUser();
        }, []);
    }
    if (dbUser){
        return (
            <div>
                <h1>{dbUser.username}'s Profile</h1>
                <h2>Name: {dbUser.name.first} {dbUser.name.last}</h2>
                <h2>About Me:</h2>
                <p>{dbUser.profile.bio}</p>
                <br></br>
                <br></br>
                <ul className='navClass center'>
                    <li className='nav'>
                        <Link href={'/logout'} hidden = {!user}>Logout</Link>
                    </li>
                </ul>
            </div>
        );
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