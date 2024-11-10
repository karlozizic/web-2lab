import express, { Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

interface User {
    id: number;
    username: string;
    password: string;
}

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

let users: User[] = [];
const loginAttempts = new Map<string, { count: number, lastAttempt: Date }>();

app.post('/api/register', async (req: any, res: any) => {
    const { username, password } = req.body;

    if (!username || !password) {
         return res.status(400).json({ error: 'Username and password are required' });
    }

    if (users.find(user => user.username === username)) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    let id = users.length + 1;
    users.push({ id, username, password});
    res.status(201).json({ username });
});

app.post('/api/login-unsafe', async (req: any, res: any) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const attempts = loginAttempts.get(username) || { count: 0, lastAttempt: new Date() };
    attempts.count++;
    attempts.lastAttempt = new Date();
    loginAttempts.set(username, attempts);

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ error: 'Username does not exist',
        attempts: attempts.count,
        lastAttempt: attempts.lastAttempt
        });
    }

    const validPassword = user.password === password;
    if (!validPassword) {
        return res.status(401).json({ error: 'Invalid password',
        attempts: attempts.count,
        lastAttempt: attempts.lastAttempt
        });
    }

    loginAttempts.delete(username);

    res.status(200).json({
        username,
        message: 'Login successful'
    });
});

app.post('/api/login', async (req: any, res: any) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const attempts = loginAttempts.get(username) || { count: 0, lastAttempt: new Date() };
    if (attempts.count >= 3 && new Date().getTime() - attempts.lastAttempt.getTime() < 30000) {
        return res.status(400).json({ error: 'Too many login attempts. Try again later in 30 seconds' });
    }
    attempts.count++;
    attempts.lastAttempt = new Date();
    loginAttempts.set(username, attempts);

    const loginSuccessful = users.find(u => u.username === username && u.password === password);

    if (!loginSuccessful) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    loginAttempts.delete(username);

    res.status(200).json({ username });
});

app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});