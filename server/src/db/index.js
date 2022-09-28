/* eslint-disable no-console */
/**
 * @description This contains the database connection specification
 * @author Haswanth reddy
 * @since 28-09-2022 9:35 PM IST
 */

import mongoose from 'mongoose';
import { mongoConnectionString } from '../constants';

mongoose.connect(mongoConnectionString, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Database connected');
	}
});
