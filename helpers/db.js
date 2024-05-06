import * as valid from './valid.js';
import { users } from '../dbconfig/mongoCollections.js';
import { ObjectId } from 'mongodb';
import { registerUser } from './firebase.js';

export const createUserDB = async (
	firstName,
	lastName,
	username,
	email,
	password,
	bio,
	picture
) => {
	firstName = valid.validName(firstName, 25);
	lastName = valid.validName(lastName, 25);
	username = valid.validString(username, { regex: /^[A-Za-z0-9]+$/ });
	email = valid.validString(email, { regex: /^\S+@\S+\.\S+$/ });
	password = valid.validString(password, { min: 12, max: 30 });
	bio = valid.validString(bio, { max: 200, optional: true });
	// TODO: validate picture

	let { success, data } = await registerUser(email, password);
	if (!success) throw `Could not register user: ${data}`;

	let userData = {
		uid: data.uid,
		name: { first: firstName, last: lastName },
		username: username,
		email: email,
		join_timestamp: Date.now(),
		profile: { bio: bio, picture: picture }
	};

	const usersCollection = await users();
	const insertInfo = await usersCollection.insertOne(userData);
	if (!insertInfo.acknowledged || !insertInfo.insertedId)
		throw `Unable to register user with username ${username}`;
	const newId = insertInfo.insertedId.toString();
	console.log(newId);

	const user = await getUserDB(newId);
	return {
		_id: user._id,
		uid: user.uid,
		name: user.name,
		username: user.username
	};
};

export const getUserDB = async (userId) => {
	userId = valid.validObjectId(userId);
	userId = new ObjectId(userId);

	const usersCollection = await users();
	const user = await usersCollection.findOne({ _id: userId });
	if (user === null) throw `No such user with id ${userId}`;

	return user;
};

export const getUserFromUsernameDB = async (username) => {
	username = valid.validString(username, { regex: /^[A-Za-z0-9]+$/ });

	const usersCollection = await users();
	const user = await usersCollection.findOne({ username: username });
	if (user === null) return null;

	return user;
};

export const loginUserDB = async (email, password) => {
	email = valid.validString(email, { regex: /^\S+@\S+\.\S+$/ });
	password = valid.validString(password, { min: 12, max: 30 });

	return true;
};
