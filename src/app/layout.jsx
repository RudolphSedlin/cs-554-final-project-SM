'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { useContext } from 'react';
import {
	AuthProvider,
	AuthContext,
	useAuthContext
} from '@/context/AuthContext';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main className="layoutStyle">
					<AuthProvider>
						<ul className="navClass center">
							<li className="nav">
								<Link href={'/'}>🏠Home</Link>
							</li>
							<li className="nav">
								<Link href={'/account'}>🧑Account</Link>
							</li>
							<li className="nav">
								<Link href={'/posts'}>🏛️Posts</Link>
							</li>
							<li className="nav">
								<Link href={'/posts/create'}>📝Create Post</Link>
							</li>
						</ul>

						{children}
					</AuthProvider>
				</main>
			</body>
		</html>
	);
}
