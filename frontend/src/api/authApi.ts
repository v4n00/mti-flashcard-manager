import axios from 'axios';
const APIURL = 'http://localhost:3000';

export async function login({ username, password }: { username: string; password: string }) {
	return await axios.post(`${APIURL}/user/login`, { username, password });
}

export async function signUp({ username, password, confirmPassword }: { username: string; password: string; confirmPassword: string }) {
	return await axios.post(`${APIURL}/user/register`, { username, password, confirmPassword });
}

export async function validate({ token }: { token: string }) {
	return await axios.get(`${APIURL}/user/validate`, { headers: { Authorization: `Bearer ${token}` } });
}
