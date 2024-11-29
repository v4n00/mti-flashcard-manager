import bcrypt from 'bcrypt';
import db from '../config/firebase';

export async function createUser(username: string, password: string) {
	const hashedPassword = await bcrypt.hash(password, 10);
	await db.collection('users').add({ username, password: hashedPassword, flashcards: [] });
}

export async function getUser(username: string) {
	const users = await db.collection('users').where('username', '==', username).get();
	return users.docs.map((doc) => doc.data());
}
