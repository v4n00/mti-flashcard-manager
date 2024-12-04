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

export const createFlashcard = async (username: string, { frontSide, backSide }: { frontSide: string; backSide: string }): Promise<Flashcard> => {
	const userRef = await getUserRef(username);
	const userData = await getUser(username);

	if (userRef && userData) {
		const flashcard = { id: userData?.total + 1, frontSide, backSide };
		await userRef.update({
			total: admin.firestore.FieldValue.increment(1),
			flashcards: admin.firestore.FieldValue.arrayUnion(flashcard),
		});
		return flashcard;
	} else throw new Error('User not found');
};

export const updateFlashcard = async (username: string, flashcardId: number, updatedFlashcard: Partial<Flashcard>): Promise<Flashcard> => {
	const userRef = await getUserRef(username);
	const userData = await getUser(username);

	if (userRef && userData) {
		const newFlashcard = await getFlashcardById(username, flashcardId);
		if (!newFlashcard) throw new Error('Flashcard not found');

		newFlashcard.frontSide = updatedFlashcard.frontSide || newFlashcard.frontSide;
		newFlashcard.backSide = updatedFlashcard.backSide || newFlashcard.backSide;

		const flashcards = userData.flashcards.map((flashcard) => (flashcard.id === flashcardId ? newFlashcard : flashcard));

		await userRef.update({ flashcards });
		return newFlashcard;
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
