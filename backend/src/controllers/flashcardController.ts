import { FieldValue } from 'firebase-admin/firestore';
import db from '../config/firebase';
import { Flashcard } from '../models/flashcard';

export async function createFlashcard(userId: string, data: Flashcard) {
	db.collection('users')
		.doc(userId)
		.update({
			flashcards: FieldValue.arrayUnion(data),
		});
}

export async function getFlashcards(userId: string) {
	const user = await db.collection('users').doc(userId).get();
	const userData = user.data();
	return userData?.flashcards;
}

export async function deleteFlashcard(userId: string, flashcardId: string) {
	db.collection('users')
		.doc(userId)
		.update({
			flashcards: FieldValue.arrayRemove({ id: flashcardId }),
		});
}

export async function updateFlashcard(userId: string, data: Flashcard) {
	db.collection('users')
		.doc(userId)
		.update({
			flashcards: FieldValue.arrayUnion(data),
		});
}
