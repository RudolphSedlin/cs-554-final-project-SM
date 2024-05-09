import { getUserDB, getUserFromUidDB } from '@/helpers/db_users';
import { NextResponse } from 'next/server';

export async function GET(req) {
	const url = new URL(req.url);
	const uid = url.searchParams.get('uid');
	const oid = url.searchParams.get('oid');
	try {
		let user;
		if (uid) {
			user = await getUserFromUidDB(uid);
		} else if (oid) {
			user = await getUserDB(oid);
		}
		console.log(`Found user: ${JSON.stringify(user)}`);
		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
