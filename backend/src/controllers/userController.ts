import bcrypt from 'bcrypt';
import db from '../config/firebase';
import { User } from '../models/user';

export const createUser = async (username: string, password: string): Promise<void> => {
	const hashedPassword = await bcrypt.hash(password, 10);
	await db.collection('users').add({ username, password: hashedPassword, flashcards: [] });
};

export const getUser = async (username: string): Promise<User | null> => {
	const docs = await db.collection('users').where('username', '==', username).get();
	if (!docs.empty) {
		return docs.docs[0].data() as User;
	} else return null;
};

export const loginUser = async (username: string, password: string): Promise<User | null> => {
	const user = await getUser(username);
	if (user && (await bcrypt.compare(password, user.password))) {
		return user;
	} else return null;
};
