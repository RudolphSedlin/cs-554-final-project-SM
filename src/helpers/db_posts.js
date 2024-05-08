import * as valid from './valid.js';
import { posts } from '../config/mongoCollections.js';

export const createPostDB = async (title, body, author, tags, visibility) => {
	title = valid.validString(title, { max: 50 });
	body = valid.validString(body, { max: 200 });
	author = valid.validObjectId(author);
	tags = valid.validString(tags, { regex: /^[a-zA-Z,]+$/ });
	tags = tags.split(',');
	visibility = valid.validNumber(visibility, { min: 0, max: 1 });

	let postData = {
		title,
		body,
		author,
		likes: [],
		comments: [],
		tags,
		created_timestamp: Date.now(),
		status: 0,
		visibility
	};

	const postsCollection = await posts();
	const insertInfo = await postsCollection.insertOne(postData);
	if (!insertInfo.acknowledged || !insertInfo.insertedId)
		throw `Post creation error: DB error for post ${title}`;
	const newId = insertInfo.insertedId.toString();

	return {
		_id: newId,
		title,
		body
	};
};
