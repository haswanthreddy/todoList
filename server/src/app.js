/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const { Strategy } = require('passport-google-oauth20');

const {
	CLIENT,
	PORT,
	CLIENT_ID,
	CLIENT_SECRET,
	SECRET_KEY_1,
	SECRET_KEY_2,
} = require('./constants');

// handle extensions with webpack

// routes

/**
 * @desc passport.use is to add a function/ middleware to a Stratergy
 */

const authOptions = {
	callbackURL: '/auth/google/callback',
	clientID: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
	console.log('googleProfile', profile);
	done(null, profile);
}

passport.use(new Strategy(authOptions, verifyCallback));

// save the session to the cookie
passport.serializeUser((user, done) => {
	// user.findById(id).then((user) => {
	// 	done(null, user);
	// });
	done(null, user.id);
});

// read the session from the cookie
passport.deserializeUser((id, done) => {
	done(null, id);
});

const app = express();

/**
 * @dec helmet is protecting our end points from common configuration issues
 */
app.use(helmet());

/**
 * @desc cookie session needs to initialized before passport session
*/
app.use(cookieSession({
	name: 'session',
	maxAge: 24 * 60 * 60 * 1000,
	keys: [SECRET_KEY_1, SECRET_KEY_2],
}));

/**
 * @desc passport.initialize returns a function that helps to setup passport session function
 */
app.use(passport.initialize());
app.use(passport.session());
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
		});
	}
	next();
}

app.get('/auth/google', passport.authenticate('google', {
	scope: ['email'], // data we requesting to google what data we need when succeeds
}));

app.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/failure',
		successRedirect: '/',
		session: true,
	}),
	(req, res) => {
		// res.redirect('/')
		console.log('google called us back');
	},
);

app.get('/failure', (req, res) => res.send('Failed to login'));

app.get('/secret', checkLoggedIn, (req, res) => res.send('secret'));

app.get('/logout', checkLoggedIn, (req, res) => {
	req.logOut(); // removes req.user and clears any logged in session
	return res.redirect('/');
});

// routes middleware

// passport

// oauth

// cookiesession

// logout

// except for the above routes rest of the all endpoints would hit here
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
