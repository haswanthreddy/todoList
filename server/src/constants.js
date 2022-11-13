require('dotenv').config()

const {
	ATLAS_USER,
	ATLAS_PASSWORD,
	ATLAS_CLUSTER,
	MONGO_DB,
	PORT = 3000,
	CLIENT
} = process.env;

const mongoConnectionString = `mongodb+srv://${ATLAS_USER}:${ATLAS_PASSWORD}@${ATLAS_CLUSTER}/${MONGO_DB}?retryWrites=true`;

module.exports = {
	ATLAS_USER,
	ATLAS_PASSWORD,
	ATLAS_CLUSTER,
	MONGO_DB,
	PORT,
	CLIENT,
	mongoConnectionString
}
