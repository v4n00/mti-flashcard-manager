import 'dotenv/config';
import express from 'express';
import { PORT } from './const';

const app = express();

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
