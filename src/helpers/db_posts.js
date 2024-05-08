import * as valid from './valid.js';
import { posts } from '../dbconfig/mongoCollections.js';

export const createPost = async (title, body, author, tags, visibility) => {
	title = valid.validString(title, { max: 50 });
	body = valid.validString(body, { max: 200 });
};
