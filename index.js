import { createUserDB } from './src/helpers/db_users.js';
import {
	loginUser,
	logoutUser,
	registerUser
} from './src/firebase/firebase.js';

// try {
// 	let user = await createUserDB(
// 		'Rishi',
// 		'Raj',
// 		'rishabhraj0723',
// 		'joe@gmail.com',
// 		'testingPassword01',
// 		'This is my biography, one two three four five!'
// 	);
// } catch (err) {
// 	console.error(err);
// }

try {
	let user = await loginUser('joe@gmail.com', 'testingPassword01');
} catch (err) {
	console.error(err);
}

// try {
// 	let success = await logoutUser();
// 	console.log(success);
// } catch (err) {
// 	console.error(err);
// }
