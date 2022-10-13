/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { CLIENT, PORT } from './constants.js';
// handle extensions with webpack

const __dirname = path.resolve();

// routes

const app = express();

app.use(cors({
	origin: CLIENT,
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => res.send(`<h1>TODO-LIST backend running on ${PORT}</h1>`));

// routes middleware

// except for the above routes rest of the all endpoints would hit here
// app.get('/*', (req, res) => {
// 	res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

export default app;
