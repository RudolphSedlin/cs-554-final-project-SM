'use client'
import Link from 'next/link';
import React, {useContext} from 'react';
import { useUser, AuthContext } from '@/context/AuthContext';

export default function Home() {
  const {user} = useContext(AuthContext);
  console.log(user);
  return (
    <div>
      <p>
        Welcome to Forumblogs!
      </p>
    </div>
  );
}
