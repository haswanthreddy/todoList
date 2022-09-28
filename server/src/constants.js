import * as env from 'dotenv';

env.config();

export const {
	ATLAS_USER,
	ATLAS_PASSWORD,
	ATLAS_CLUSTER,
	MONGO_DB,
} = process.env;

export const mongoConnectionString = `mongodb+srv://${ATLAS_USER}:${ATLAS_PASSWORD}@${ATLAS_CLUSTER}/${MONGO_DB}?retryWrites=true`;
