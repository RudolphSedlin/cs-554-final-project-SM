import * as db from './helpers/db.js';

// try {
// 	let newUser = await db.createUserDB(
// 		'Jane',
// 		'Doe',
// 		'janedoe2',
// 		'janedoe2',
// 		'john@doe.net'
// 	);
// 	console.log(newUser);
// } catch (err) {
// 	console.error(err);
// }

// try {
// 	let foundUser = await db.getUserFromUsernameDB('johndoe1');
// 	console.log(foundUser);
// } catch (err) {
// 	console.error(err);
// }

// try {
// 	let newUser = await db.createUserDB(
// 		'John',
// 		'Doe',
// 		'johndoe4',
// 		'twelvepassword',
// 		'johnny@doe.net'
// 	);
// 	console.log(newUser);
// } catch (err) {
// 	console.error(err);
// }

try {
	let loggedIn = await db.loginUserDB('johndoe', 'twelvepassword');
	console.log(loggedIn);
} catch (err) {
	console.error(err);
}
