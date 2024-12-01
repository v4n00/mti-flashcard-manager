import axios from 'axios';
const APIURL = 'http://localhost:3000';

export interface loginType {
	username: string;
	password: string;
}

export interface signUpType {
	username: string;
	password: string;
	confirmPassword: string;
}

export interface validateType {
	token: string;
}

export async function login({ username: username, password }: loginType) {
	return await axios.post(`${APIURL}/user/login`, { username, password });
}

export async function signUp({ username, password, confirmPassword }: signUpType) {
	return await axios.post(`${APIURL}/user/register`, { username, password, confirmPassword });
}

export async function validate({ token }: validateType) {
	return await axios.get(`${APIURL}/user/validate`, { headers: { Authorization: `Bearer ${token}` } });
}
