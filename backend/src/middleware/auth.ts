import 'dotenv/config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { userTokenExpiration } from '../config/const';
import { RequestWithToken } from '../models/requests';
import { User } from '../models/user';

export const verifyToken = (req: RequestWithToken, res: Response, next: NextFunction) => {
	// check if header has authorization field
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		res.status(401).json('Authorization header not provided');
		return;
	}

	// check if the token exists
	const token = authHeader.split(' ')[1];
	if (!token) {
		res.status(401).json('No token provided');
		return;
	}

	// verify the token
	jwt.verify(token, process.env.JWT_KEY!, (e, decodedToken) => {
		if (e) {
			res.status(401).json('Invalid token');
			return;
		}
		req.decodedToken = decodedToken;
		next();
	});
};

export function generateToken(user: User): string {
	return jwt.sign(
		{
			username: user.username,
		},
		process.env.JWT_KEY!,
		{
			expiresIn: userTokenExpiration,
		}
	);
}
