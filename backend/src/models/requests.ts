import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface LoginRequest {
	username: string;
	password: string;
}

export interface RegisterRequest {
	username: string;
	password: string;
	confirmPassword: string;
}

export interface RequestWithToken extends Request {
	decodedToken?: string | JwtPayload;
}
