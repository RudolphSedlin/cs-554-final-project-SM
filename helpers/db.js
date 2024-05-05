import * as valid from './valid.js';
import { users } from '../dbconfig/mongoCollections.js';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
const SALT_ROUNDS = 16;

export const createUserDB = async (
	firstName,
	lastName,
	username,
	password,
	email,
	bio,
	picture
) => {
	firstName = valid.validName(firstName, 25);
	lastName = valid.validName(lastName, 25);
	username = valid.validString(username, { regex: /^[A-Za-z0-9]+$/ });
	password = valid.validString(password, { min: 12, max: 30 });
	email = valid.validString(email, { max: 50, regex: /^\S+@\S+\.\S+$/ });
	bio = valid.validString(bio, { max: 200, optional: true });
	// TODO: validate picture

	let userExists = await getUserFromUsernameDB(username);
	if (userExists) throw `User ${username} already exists`;

	const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

	let userData = {
		name: { first: firstName, last: lastName },
		username: username,
		pw_hash: hashedPassword,
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

export const loginUserDB = async (username, password) => {
	username = valid.validString(username, { regex: /^[A-Za-z0-9]+$/ });
	password = valid.validString(password, { min: 12, max: 30 });

	let userExists = await getUserFromUsernameDB(username);
	if (!userExists) throw `Username or password is incorrect`;

	let passwordMatch = await bcrypt.compare(password, userExists.pw_hash);
	if (!passwordMatch) throw `Username or password is incorrect`;

	return true;
};
