'use client';
import { useRouter, redirect } from 'next/navigation';
import styles from '@/app/form.module.css';
import { useState, useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';

function CreatePost() {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [tags, setTags] = useState('');
	const { user } = useAuthContext();

	useEffect(() => {
		if (user == null) {
			redirect('/login');
		} else {
			async function fetchUser(uid) {
				const response = await fetch(`/api/users?uid=${uid}`);
				if (!response.ok) {
					throw new Error('Failed to fetch user');
				}
				return response.json();
			}
			fetchUser(user.uid);
		}
	}, [user]);

	const router = useRouter();

	const handleForm = async (event) => {
		event.preventDefault();
		if (user != null) {
			try {
				const response = await fetch('/api/posts', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						title: title,
						body: body,
						username: 'jjohn123',
						tags: tags
					})
				});
				const data = await response.json();
				if (data.success) {
					router.push('/private');
				} else {
					console.error('Failed to create post:', data.message);
				}
			} catch (error) {
				console.error('Error submitting form:', error);
			}
		}
	};

	return (
		<form onSubmit={handleForm} className={styles.myform}>
			<div className="form-group">
				<label className={styles.myLabel}>
					Title:
					<input
						className={styles.myInput}
						onChange={(e) => setTitle(e.target.value)}
						name="title"
						type="text"
					/>
				</label>
			</div>
			<div className="form-group">
				<label className={styles.myLabel}>
					Body:
					<textarea
						className={styles.myInput}
						onChange={(e) => setBody(e.target.value)}
						name="body"
					/>
				</label>
			</div>
			<div className="form-group">
				<label className={styles.myLabel}>
					Tags:
					<input
						className={styles.myInput}
						onChange={(e) => setTags(e.target.value)}
						name="tags"
						type="text"
					/>
				</label>
			</div>
			<div className="form-group">
				<button className={styles.myButton} type="submit">
					Post
				</button>
			</div>
		</form>
	);
}

export default CreatePost;
