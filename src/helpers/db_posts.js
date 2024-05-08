import * as valid from './valid.js';
import { posts } from '../config/mongoCollections.js';

export const createPost = async (title, body, author, tags, visibility) => {
	title = valid.validString(title, { max: 50 });
	body = valid.validString(body, { max: 200 });
	author = valid.validObjectId(author);
	tags = valid.validArray(tags, { nullOk: false, type: 'string' });
	visibility = valid.validNumber(visibility, { min: 0, max: 1 });

	return {
		title,
		body,
		author,
		likes: [],
		comments: [],
		tags,
		created_timestamp: Date.now(),
		visibility
	};
};
