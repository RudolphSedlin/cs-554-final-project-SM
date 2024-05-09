import * as valid from './valid.js';
import { posts } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';

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

export const getPostDB = async (id) => {
	id = valid.validObjectId(id);
	id = new ObjectId(id);

	const postsCollection = await posts();
	const post = await postsCollection.findOne({ _id: id });
	if (post === null) throw `Post retrieval error: No post with id ${id}`;

	return post;
};

export const getPostsDB = async () => {
	const postsCollection = await posts();
	const postsArr = await postsCollection.find({}).toArray();
	console.log(`Got posts: ${JSON.stringify(postsArr)}`);
	return postsArr;
};

export const getPostsBySearchTermDB = async (term) => {
	term = valid.validString(term, { max: 50 });
	const postsCollection = await posts();
	await postsCollection.createIndex({ title: 'text' });
	const postsArr = await postsCollection
		.find({ $text: { $search: term } })
		.toArray();
	console.log(`Got posts: ${JSON.stringify(postsArr)}`);
	return postsArr;
=======
import { posts } from '../dbconfig/mongoCollections.js';

export const createPost = async (title, body, author, tags, visibility) => {
	title = valid.validString(title, { max: 50 });
	body = valid.validString(body, { max: 200 });
};
