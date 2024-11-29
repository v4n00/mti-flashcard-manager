import express, { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { createUser, getUser, loginUser } from '../controllers/userController';
import { generateToken, verifyToken } from '../middleware/auth';
import { LoginRequest, RegisterRequest, RequestWithToken } from '../models/requests';

const userRouter = express.Router();

userRouter.route('/user/validate').get(verifyToken, async (req: RequestWithToken, res: Response) => {
	try {
		const decodedToken = req.decodedToken;

		const user = await getUser((decodedToken as JwtPayload).username);
		if (!user) {
			res.status(401).json('User not found');
			return;
		} else {
			res.status(200).json({ username: user.username, token: generateToken(user) });
			return;
		}
	} catch (e) {
		res.status(500).json('Internal Server Error');
		return;
	}
});

userRouter.route('/user/login').post(async (req: Request, res: Response) => {
	let { username, password } = req.body as LoginRequest;

	if (!username || !password) {
		res.status(400).json('Bad Request');
		return;
	}

	try {
		const user = await loginUser(username, password);

		if (user) {
			res.status(200).json({ username: user.username, token: generateToken(user) });
			return;
		} else {
			res.status(401).json('Email not found or password does not match');
			return;
		}
	} catch (e) {
		res.status(500).json('Internal Server Error');
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
		res.status(200).json('User created');
		return;
	} catch (e) {
		res.status(500).json('Internal Server Error');
		return;
	}
});

export default userRouter;
