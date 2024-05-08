import { createPostDB } from '@/helpers/db_posts';
import { getUserFromUsernameDB } from '@/helpers/db_users';
import { NextResponse } from 'next/server';

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
