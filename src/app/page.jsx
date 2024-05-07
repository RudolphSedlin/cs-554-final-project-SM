'use client'
import Link from 'next/link';
import React, {useContext} from 'react';
import { useEffect } from "react";
import { useUser } from '@/context/AuthContext';

export default function Home() {
  const {user} = useUser();
  console.log(user);
  return (
    <div>
      <p>
        Welcome to Forumblogs!
      </p>
    </div>
  );
}
