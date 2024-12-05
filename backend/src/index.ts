import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import config from './config/const';
import flashcardRouter from './routes/flashcardRouter';
import userRouter from './routes/userRouter';

const app = express();
app.use(express.json());
app.use(morgan('combined'));
app.use(
	cors({
		origin: config.clientAddress,
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
	})
);

app.use('/', userRouter);
app.use('/', flashcardRouter);

app.get('/', (_req, res) => {
	res.send(`Server is running. Client address: ${config.clientAddress}`);
});

app.listen(config.serverPort, () => {
	console.log(`Server is running on ${config.serverAddress}:${config.serverPort}\nClient address: ${config.clientAddress}`);
});
