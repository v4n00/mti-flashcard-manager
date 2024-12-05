import 'dotenv-flow/config';

const serverPort = 3000;
const serverAddress = 'http://localhost';
const clientAddress = process.env.CLIENT_ADDRESS || '*';
const userTokenExpiration = '7d';
const jwtKey = process.env.JWT_KEY || 'secret';

const config = {
	serverAddress,
	serverPort,
	clientAddress,
	userTokenExpiration,
	jwtKey,
};
export default config;
