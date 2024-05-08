'use client'
import {redirect} from 'next/navigation';
import React, {useContext} from 'react';
import {useAuthContext, AuthContext} from '@/context/AuthContext';

const PrivateRoute = () => {
  const {user} = useAuthContext();
  //console.log('Private Route Comp current user', currentUser);
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  if (user == null){
    redirect('/login');
  }
  return (<h1>Only logged in users can view this page</h1>);
};

export default PrivateRoute;
