'use client'
import {Inter} from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { useContext } from 'react';
import {AuthProvider, AuthContext, useAuthContext} from '@/context/AuthContext';
const inter = Inter({subsets: ['latin']});



export default function RootLayout({children}) {
  let {user} = useAuthContext();
  console.log(user);
  if (user){
    return (
      <AuthProvider>
      <html lang='en'>
        <body className={inter.className}>
            <main className='layoutStyle'>
           
              <ul className='navClass center'>
                <li className='nav'>
                  <Link href={'/'}>Home</Link>
                </li>
                <li className='nav'>
                  <Link href={'/logout'}>Logout</Link>
                </li>
              </ul>
              
                {children}
              
            </main>
          
        </body>
      </html>
      </AuthProvider>
    
  );
}
  else return (
      <html lang='en'>
        <body className={inter.className}>
            <main className='layoutStyle'>
            <AuthProvider>
              <ul className='navClass center'>
                <li className='nav'>
                  <Link href={'/'}>Home</Link>
                </li>
                <li className='nav'>
                  <Link href={'/register'}>Register</Link>
                </li>
                <li className='nav'>
                  <Link href={'/login'}>Login</Link>
                </li>
              </ul>
              
                {children}
              </AuthProvider>
            </main>
          
        </body>
      </html>
    
  );
}
