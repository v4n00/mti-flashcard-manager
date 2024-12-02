import cors from 'cors';
import express from 'express';
import { PORT } from './config/const';
import flashcardRouter from './routes/flashcardRouter';
import userRouter from './routes/userRouter';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', userRouter);
app.use('/', flashcardRouter);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
