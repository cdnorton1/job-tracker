const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const jobs = require('./jobs.js');



const argv = yargs.argv;

var command = argv._[0];


if (command === 'add') {
	var job = jobs.addJob(argv.company, argv.position, argv.dateApplied, argv.source, argv.comments);
	if (job) {
		console.log('Job saved successfully!');
		jobs.logJob(job);
	} 
} else if (command === 'list') {
	var allJobs = jobs.getAll();
	console.log(`Listing ${allJobs.length} job(s)...`);
	allJobs.forEach((job) => {
		jobs.logJob(job);
	});
} else if (command === 'read') {
	var job = jobs.getJob(argv.company);
	if (job) {
		console.log('Job(s) Found!');
		jobs.logJob(job);
	} else {
		console.log('Company Not Found!');
	}
} else if (command === 'remove') {
	var jobRemoved = jobs.removeJob(argv.company);

	var message = jobRemoved ? 'Job removed successfully!' : 'Job could not be found!';
	console.log(message);
} else {
	console.log('Command not recognized...');
}
