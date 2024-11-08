import express, { Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const app = express();

const PORT = process.env.PORT || 4080;

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
});

app.get('/api/test', (req: Request, res: Response) => {
    res.json({ message: 'Hello world' });
});

app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});