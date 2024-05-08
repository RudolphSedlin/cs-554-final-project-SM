import { getUserFromUidDB } from '@/helpers/db_users';
import { NextResponse } from 'next/server';

export async function GET(req) {
	const url = new URL(req.url);
	const uid = url.searchParams.get('uid');
	try {
		const user = await getUserFromUidDB(uid);
		console.log(`Found user: ${JSON.stringify(user)}`);
		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
