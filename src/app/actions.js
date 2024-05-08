'use server';
import { validName } from '../helpers/valid';
import {redirect} from 'next/navigation';
import {revalidatePath} from 'next/cache';
import { createUserDB, loginUserDB } from '../helpers/db';

export async function createPost(prevState, formData) {
  let title,
    body,
    posterId,
    tags = null;
  let id = null;
  let success = false;
  let errors = [];
  title = formData.get('title');
  body = formData.get('body');
  posterId = formData.get('posterId');
  tags = formData.get('tags');

  try {
    title = validation.checkString(title, 'Title');
  } catch (e) {
    errors.push(e);
  }

  try {
    body = validation.checkString(body, 'Body');
  } catch (e) {
    errors.push(e);
  }

  try {
    posterId = validation.checkId(posterId, 'Poster ID');
  } catch (e) {
    errors.push('Error: You Must select a user who posted from the dropdown!');
  }

  if (tags) {
    try {
      tags = tags.split(',');
      tags = validation.checkStringArray(tags, 'Tags');
    } catch (e) {
      errors.push(e);
    }
  }

  if (errors.length > 0) {
    return {message: errors};
  } else {
    try {
      let newPost = await postData.addPost(title, body, posterId, tags);
      id = newPost._id.toString();
      // redirect(`/posts/${id}`); // Navigate to new route
      success = true;
    } catch (e) {
      return {message: e};
    } finally {
      if (success) {
        revalidatePath('/posts');
        redirect(`/posts/${id}`); // Navigate to new route
      }
    }
  }
}

export async function createUser(prevState, formData) {
  let firstName,
    lastName, username, email, passwordOne, passwordTwo = null;
  let id = null;
  let success = false;
  let errors = [];
  firstName = formData.get('firstName');
  lastName = formData.get('lastName');
  username = formData.get('username');
  email = formData.get('email');
  passwordOne = formData.get('passwordOne');
  passwordTwo = formData.get('passwordTwo');
  if (passwordOne !== passwordTwo) {
    errors.push('Passwords do not match');
  }

  if (errors.length > 0) {
    return {message: errors};
  } else {
    try {
      let newUser = await createUserDB(firstName, lastName,
        username,
        email,
        passwordOne,
        'testbio', 'testpic');
      success = true;
      //redirect(`/posts/${id}`); // Navigate to new route
    } catch (e) {
      return {message: e};
    } finally {
      if (success) {
        revalidatePath('/register');
        redirect(`/`); // Navigate to new route
      }
    }
  }
}

export async function actionLogin(prevState, formData) {
  let email, password = null;
  let id = null;
  let success = false;
  let errors = [];
  email = formData.get('email');
  password = formData.get('password');

  if (errors.length > 0) {
    return {message: errors};
  } else {
    try {
      let loginUser = await loginUserDB(email, password);
      success = true;
      //redirect(`/posts/${id}`); // Navigate to new route
    } catch (e) {
      return {message: e};
    } finally {
      if (success) {
        revalidatePath('/login');
        redirect(`/`); // Navigate to new route
      }
    }
  }
}
