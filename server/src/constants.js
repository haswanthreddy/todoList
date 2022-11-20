const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const {
	ATLAS_USER,
	ATLAS_PASSWORD,
	ATLAS_CLUSTER,
	MONGO_DB,
	PORT = 3000,
	CLIENT,
	CLIENT_ID,
	CLIENT_SECRET,
	SECRET_KEY_1,
	SECRET_KEY_2,
} = process.env;

const mongoConnectionString = `mongodb+srv://${ATLAS_USER}:${ATLAS_PASSWORD}@${ATLAS_CLUSTER}/${MONGO_DB}?retryWrites=true`;

module.exports = {
	ATLAS_USER,
	ATLAS_PASSWORD,
	ATLAS_CLUSTER,
	MONGO_DB,
	PORT,
	CLIENT,
	mongoConnectionString,
	CLIENT_ID,
	CLIENT_SECRET,
	SECRET_KEY_1,
	SECRET_KEY_2,
};
