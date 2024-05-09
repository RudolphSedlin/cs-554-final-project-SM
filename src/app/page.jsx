'use client';
import Link from 'next/link';
import React, { useContext } from 'react';
import { useAuthContext, AuthContext } from '@/context/AuthContext';

export default function Home() {
	const { user } = useAuthContext();
	console.log(`USER: ${user}`);
	return (
		<div>
			{user ? (
				<>
					<p>
						Welcome to Forumblogs! You are logged in as {user.displayName}.
					</p>
					<p>
						Go check out the Forum in Posts!
					</p>
					
				</>
			) : (
				<>
					<p>Welcome to Forumblogs! Please log in.</p>
				</>
			)}
		</div>
	);
}
