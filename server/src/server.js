import http from 'http';
import cluster from 'cluster';
import os from 'os';
import { PORT } from './constants.js';
import app from './app.js';

cluster.schedulingPolicy = cluster.SCHED_RR; // for windows only

// passport

// oauth

// cookiesession

// logout

if (cluster.isPrimary) {
	for (let cores = 0; cores < os.cpus().length; cores++) {
		cluster.fork();
	}
} else {
	http.createServer(app).listen(PORT, () => {
		console.log(`server is running on port ${PORT}`);
	});
}
