import admin from 'firebase-admin';
import { Flashcard } from '../models/user';
import { getUser, getUserRef } from './userController';

export const getFlashcards = async (username: string): Promise<Flashcard[] | null> => {
	const user = await getUser(username);
	if (user) {
		return user.flashcards;
	} else return null;
};

export const getFlashcardById = async (username: string, flashcardId: number): Promise<Flashcard | null> => {
	const flashcards = await getFlashcards(username);
	if (flashcards) {
		return flashcards.find((flashcard) => flashcard.id === flashcardId) || null;
	} else return null;
};

export const createFlashcard = async (username: string, { frontSide, backSide }: { frontSide: string; backSide: string }): Promise<void> => {
	const userRef = await getUserRef(username);
	const userData = await getUser(username);

	if (userRef && userData) {
		const flashcard = { id: userData?.total + 1, frontSide, backSide };
		await userRef.update({
			total: admin.firestore.FieldValue.increment(1),
			flashcards: admin.firestore.FieldValue.arrayUnion(flashcard),
		});
		return;
	} else throw new Error('User not found');
};

export const updateFlashcard = async (username: string, flashcardId: number, updatedFlashcard: Partial<Flashcard>): Promise<void> => {
	const userRef = await getUserRef(username);
	const userData = await getUser(username);

	if (userRef && userData) {
		const flashcards = userData.flashcards.map((flashcard) => {
			console.log(flashcard.id === flashcardId);
			console.log(updatedFlashcard);
			return flashcard.id === flashcardId ? { ...flashcard, ...updatedFlashcard } : flashcard;
		});

		console.log(flashcards);

		await userRef.update({ flashcards });
		return;
	} else throw new Error('User not found');
};

export const deleteFlashcard = async (username: string, flashcardId: number): Promise<void> => {
	const userRef = await getUserRef(username);
	const userData = await getUser(username);

	if (userRef && userData) {
		const flashcards = userData.flashcards.filter((flashcard) => flashcard.id !== flashcardId);

		await userRef.update({ flashcards });
		return;
	} else throw new Error('User not found');
};
