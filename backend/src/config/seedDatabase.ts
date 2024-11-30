import { faker } from '@faker-js/faker';
import { createFlashcard } from '../controllers/flashcardController';
import { createUser } from '../controllers/userController';

const generateAndPushUser = async (flashcardCount: number) => {
	const username = faker.internet.username();
	const password = faker.internet.password();

	await createUser(username, password);

	console.log(`User created: ${username} with password: ${password}`);

	for (let i = 0; i < flashcardCount; i++) {
		const flashcard = {
			frontSide: faker.lorem.sentence(5),
			backSide: faker.lorem.sentence(15),
		};
		await createFlashcard(username, flashcard);
	}
};

(async () => {
	try {
		for (let i = 0; i < 5; i++) {
			const flashcardCount = Math.floor(Math.random() * 15) + 1;
			await generateAndPushUser(flashcardCount);
		}

		console.log('Fake users and flashcards have been added.');
	} catch (e) {
		console.error('Error generating fake data:', (e as Error).message);
	}
})();
