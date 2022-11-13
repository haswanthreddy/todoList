const os = require('os');
const path = require('path');
const https = require('https');
const cluster = require('cluster');
const { readFileSync } = require('fs')

const app = require('./app');
const {
	PORT
} = require('./constants');


cluster.schedulingPolicy = cluster.SCHED_RR; // for windows only

if (cluster.isPrimary) {
	for (let cores = 0; cores < os.cpus().length; cores++) {
		cluster.fork();
	}
	console.log("master")
} else {
	https.createServer(
		{
			cert: readFileSync(path.join(__dirname, '..', 'cert.pem')),
			key: readFileSync(path.join(__dirname, '..', 'key.pem')),
		},
		app).listen(PORT, () => {
			console.log(`server is running on port ${PORT}`);
		});
}
