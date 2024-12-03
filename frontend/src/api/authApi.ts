import { APIURL } from '@/config/const';
import axios from 'axios';

export const callLogin = async ({ username, password }: { username: string; password: string }) => {
	return await axios.post(`${APIURL}/user/login`, { username, password });
};

export const callSignUp = async ({ username, password, confirmPassword }: { username: string; password: string; confirmPassword: string }) => {
	return await axios.post(`${APIURL}/user/register`, { username, password, confirmPassword });
};

export const callValidate = async ({ token }: { token: string }) => {
	return await axios.get(`${APIURL}/user/validate`, { headers: { Authorization: `Bearer ${token}` } });
};
