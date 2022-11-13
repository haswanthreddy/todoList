/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');

const {
	CLIENT,
	PORT
} = require('./constants')

// handle extensions with webpack


// routes

const app = express();
app.use(helmet())
app.use(cors({
	origin: CLIENT,
}));
app.use(morgan('combined'));
app.use(express.json());

function checkLoggedIn(req, res, next) {
	console.log('Current user is:', req.user);
	const isLoggedIn = req.isAuthenticated() && req.user;
	if (!isLoggedIn) {
		return res.status(401).json({
			error: 'You must log in!',
		})
	}
	next()
}

app.get('/auth/google', passport.authenticate('google', {
	scope: ['email'],
}))

app.get('/auth/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/failure',
		successRedirect: '/',
		session: true,
	}))


// routes middleware

// passport

// oauth

// cookiesession

// logout

// except for the above routes rest of the all endpoints would hit here
// app.get('/*', (req, res) => {
// 	res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

module.exports = app;
