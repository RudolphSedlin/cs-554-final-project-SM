'use client';
import { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '@/firebase/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loadingUser, setLoadingUser] = useState(true); // Helpful, to update the UI accordingly.

	useEffect(() => {
		// Listen authenticated user
		const unsubscriber = onAuthStateChanged(auth, async (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
			console.log('onAuthStateChanged', user);
			setLoadingUser(false);
		});

		// Unsubscribe auth listener on unmount
		return () => unsubscriber();
	}, []);

	return (
		<AuthContext.Provider value={{ user }}>
			{loadingUser ? <div>Loading...</div> : children}
		</AuthContext.Provider>
	);
};
