import { createPostDB } from '@/helpers/db_posts';
import { getUserFromUsernameDB, createUserDB } from '@/helpers/db_users';
import { NextResponse } from 'next/server';

export async function POST(req) {
	const { firstName, lastName, username, email, passwordOne, passwordTwo } = await req.json();
	console.log(firstName, lastName, username, email, passwordOne, passwordTwo );
    const bio = "testbio";
    const pic = "testpic";

    if (passwordOne !== passwordTwo) {
		return NextResponse.json(
			{
				success: false,
				error: `Passwords do not match`
			},
			{ status: 500 }
		);
	}

	try {
		const user = await createUserDB(firstName, lastName, username, email, passwordOne, bio, pic);
		return NextResponse.json(
			{ success: true, user },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				error: `Failed to register user: ${error}`
			},
			{ status: 500 }
		);
	}
}
