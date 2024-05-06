import { loginUser, logoutUser, registerUser } from './helpers/firebase.js';

try {
	let user = await registerUser(
		'rishabhraj0723@gmail.com',
		'testingPassword1'
	);
} catch (err) {
	console.error(err);
}

try {
	let user = await loginUser('rishabhraj0723@gmail.com', 'testingPassword1');
} catch (err) {
	console.error(err);
}

try {
	let success = await logoutUser();
	console.log(success);
} catch (err) {
	console.error(err);
}
