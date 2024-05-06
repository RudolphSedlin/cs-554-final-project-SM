import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut
} from '../firebaseConfig.js';
const auth = getAuth();

export const registerUser = async (email, password) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		console.log(
			`User created with UID ${userCredential.user.uid} and email ${userCredential.user.email}`
		);
		return userCredential.user;
	} catch (err) {
		console.error(`CODE: ${err.code}, MESSAGE: ${err.message}`);
	}
};

export const loginUser = async (email, password) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		console.log(
			`User logged in with UID ${userCredential.user.uid} and email ${userCredential.user.email}`
		);
		return userCredential.user;
	} catch (err) {
		console.error(`Login failed: ${err.message}`);
	}
};

export const logoutUser = async () => {
	try {
		await signOut(auth);
		console.log(`User logged out`);
		return true;
	} catch (err) {
		console.error(`Logout error: ${err.message}`);
		return false;
	}
};
