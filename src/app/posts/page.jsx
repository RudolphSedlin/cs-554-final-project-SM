'use client';
import { useRouter, redirect } from 'next/navigation';
import styles from '@/app/form.module.css';
import { useState, useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';

function Posts() {
	const [posts, setPosts] = useState([]);
	const { user } = useAuthContext();
	useEffect(() => {
		async function fetchPosts() {
			const response = await fetch(`/api/posts`);
			if (!response.ok) {
				throw new Error('Failed to fetch posts');
			}
			const data = await response.json();
			console.log(data);
			setPosts(data);
		}
		fetchPosts();
	}, []);

	posts.sort((a, b) => b.created_timestamp - a.created_timestamp);

	return (
		<>
			<div className={styles.postsContainer}>
				{posts.map((post) => (
					<div key={post._id} className={styles.postCard}>
						<p className={styles.postAuthorName}>
							from @{post.authorUsername}
						</p>
						<h2 className={styles.postTitle}>{post.title}</h2>
						<p className={styles.postContent}>{post.body}</p>
						<div className={styles.interactions}>
							<span>Likes: {post.likes.length}</span>
							<span>Comments: {post.comments.length}</span>
							<span>
								{new Date(
									post.created_timestamp
								).toLocaleString()}
							</span>
						</div>
						<div className={styles.tagContainer}>
							{post.tags.map((tag) => (
								<span key={tag} className={styles.tag}>
									{tag}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default Posts;
