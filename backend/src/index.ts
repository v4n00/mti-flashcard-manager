import express from 'express';
import { PORT } from './config/const';
import flashcardRouter from './routes/flashcardRouter';
import userRouter from './routes/userRouter';

const missingVars = ['JWT_KEY'].filter((v) => !process.env[v]);
if (missingVars.length > 0) {
	console.error(`Missing environment variables: ${missingVars.join(', ')}`);
	process.exit(1);
}

const app = express();
app.use(express.json());

// TODO:
// fake data
app.use('/', userRouter);
app.use('/', flashcardRouter);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
