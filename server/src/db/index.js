/* eslint-disable no-console */
/**
 * @description This contains the database connection specification
 * @author Haswanth Reddy
 * @since 28-09-2022 9:35 PM IST
 */

const mongoose = require('mongoose');
const {
	mongoConnectionString
} = require('../constants');

mongoose.connect(mongoConnectionString, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Database connected');
	}
});
