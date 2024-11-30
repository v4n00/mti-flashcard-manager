import express from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { createFlashcard, deleteFlashcard, getFlashcards, updateFlashcard } from '../controllers/flashcardController';
import { verifyToken } from '../middleware/auth';
import { RequestWithToken } from '../models/requests';
import { Flashcard } from '../models/user';

const flashcardRouter = express.Router();

flashcardRouter.route('/flashcards').get(verifyToken, async (req, res) => {
	const username = ((req as RequestWithToken).decodedToken as JwtPayload).username;
	try {
		let flashcards: Flashcard[] | null = await getFlashcards(username);

		if (flashcards && flashcards.length !== 0) {
			res.status(200).json(flashcards);
			return;
		} else {
			res.status(404).json('No flashcards found');
			return;
		}
	} catch (e) {
		res.status(500).json('Internal Server Error');
		return;
	}
});

flashcardRouter.route('/flashcards').post(verifyToken, async (req, res) => {
	const { frontSide, backSide }: Flashcard = req.body;
	if (!frontSide || !backSide) {
		res.status(400).json('Bad Request');
		return;
	}

	try {
		const username = ((req as RequestWithToken).decodedToken as JwtPayload).username;
		await createFlashcard(username, { frontSide, backSide });

		res.status(201).json('Flashcard created');
		return;
	} catch (e) {
		res.status(500).json('Internal Server Error');
		return;
	}
});

flashcardRouter.route('/flashcards/:id').patch(verifyToken, async (req, res) => {
	const id = parseInt(req.params.id);
	const updateData = req.body;
	const username = ((req as RequestWithToken).decodedToken as JwtPayload).username;

	if (!id || isNaN(id) || !updateData) {
		res.status(400).json('Bad Request');
		return;
	}

	try {
		await updateFlashcard(username, id, updateData);
		res.status(200).json('Flashcard updated');
		return;
	} catch (e) {
		res.status(500).json('Internal Server Error');
		return;
	}
});

flashcardRouter.route('/flashcards/:id').delete(verifyToken, async (req, res) => {
	const id = parseInt(req.params.id);
	const username = ((req as RequestWithToken).decodedToken as JwtPayload).username;

	if (!id || isNaN(id)) {
		res.status(400).json('Bad Request');
		return;
	}

	try {
		await deleteFlashcard(username, id);
		res.status(200).json('Flashcard deleted');
		return;
	} catch (e) {
		res.status(500).json('Internal Server Error');
		return;
	}
});

export default flashcardRouter;
