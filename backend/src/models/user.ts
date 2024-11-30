export interface Flashcard {
	id: number;
	frontSide: string;
	backSide: string;
}

export interface User {
	username: string;
	password: string;
	total: number;
	flashcards: Flashcard[];
}
