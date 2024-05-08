import { createPostDB, getPostDB, getPostsDB } from '@/helpers/db_posts';
import { getUserDB, getUserFromUsernameDB } from '@/helpers/db_users';
import { NextResponse } from 'next/server';

export async function GET(req) {
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		if (id) {
			const post = await getPostDB(id);
			return NextResponse.json(post, { status: 200 });
		} else {
			let posts = await getPostsDB();
			const postsWithAuthors = await Promise.all(
				posts.map(async (post) => {
					let author = await getUserDB(post.author);
					post.authorUsername = author.username;
					return post;
				})
			);
			return NextResponse.json(postsWithAuthors, { status: 200 });
		}
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function POST(req) {
	const { title, body, username, tags } = await req.json();
	console.log(title, body, username, tags);

	try {
		const user = await getUserFromUsernameDB(username);
		const postResult = await createPostDB(
			title,
			body,
			user._id.toString(),
			tags,
			1
		);
		return NextResponse.json(
			{ success: true, postResult },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				error: `Failed to create posts: ${error}`
			},
			{ status: 500 }
		);
	}
}
