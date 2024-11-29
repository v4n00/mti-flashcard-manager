import { Flashcard } from './flashcard';

export interface User {
	username: string;
	password: string;
	flashcards: Flashcard[];
}
