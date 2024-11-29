import express from 'express';
import { PORT } from './config/const';
import userRouter from './routes/userRouter';

const app = express();
app.use(express.json());

// TODO:
// flashcard CRUD
// flashcard ownership
app.use('/', userRouter);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
