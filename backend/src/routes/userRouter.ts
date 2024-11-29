import express, { Request, Response } from 'express';
import { createUser, getUser } from '../controllers/userController';
import { LoginRequest, RegisterRequest } from '../models/requests';

const userRouter = express.Router();

userRouter.route('/user/login').post(async (req: Request, res: Response) => {
	let { username, password } = req.body as LoginRequest;
	if (!email || !password) {
		res.status(400).json('Bad Request');
		return;
	}
});

userRouter.route('/user/register').post(async (req: Request, res: Response) => {
	let { username, password, confirmPassword } = req.body as RegisterRequest;
	if (!username || !password || !confirmPassword) {
		res.status(400).json('Bad Request');
		return;
	}

	// validations
	if (username.length < 2 || username.length > 32) {
		res.status(400).json('Username must be at least 2 characters and maximum 32 characters');
		return;
	}
	if (password !== confirmPassword) {
		res.status(400).json('Passwords do not match');
		return;
	}
	if (password.length < 8 || password.length > 32) {
		res.status(400).json('Password must be at least 8 characters and maximum 32 characters');
		return;
	}

	let duplicateUser = await getUser(username);
	if (duplicateUser) {
		res.status(400).json('User already registered');
		return;
	}

	try {
		await createUser(username, password);
	} catch (err) {
		res.status(500).json('Internal Server Error');
		return;
	}
});
