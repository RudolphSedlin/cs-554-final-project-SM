import { getUserDB, getUserFromUsernameDB } from '@/helpers/db_users';
import { NextResponse } from 'next/server';

export async function GET(req) {
	const { username } = await req.json();
	try {
		const user = await getUserFromUsernameDB(username);
		console.log(`Found user: ${JSON.stringify(user)}`);
		return NextResponse.json({success: true}, {user: user}, { status: 200 });
	} catch (error) {
		return NextResponse.json({success: false}, { error: error.message }, { status: 500 });
	}
}
