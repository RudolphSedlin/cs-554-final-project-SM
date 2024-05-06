import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged
} from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAC9_o4L4F3nG3ZemOA3x_DcBAjnDdTDsw',
	authDomain: 'forumblogs-cs554.firebaseapp.com',
	projectId: 'forumblogs-cs554',
	storageBucket: 'forumblogs-cs554.appspot.com',
	messagingSenderId: '1010562432304',
	appId: '1:1010562432304:web:0ccbedf4e628b7cbda5cf5',
	measurementId: 'G-JXLRG9EPJZ'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
	auth,
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged
};
