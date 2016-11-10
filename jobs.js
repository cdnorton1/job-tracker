const fs = require('fs');

var fetchJobs = () => {
	try {
		var jobsString = fs.readFileSync('jobs-data.json');
		return JSON.parse('jobsString');
	} catch (e) {
		return [];
	}
};

var saveJobs = (jobs) => {
	fs.writeFileSync('jobs-data.json', JSON.stringify(jobs));
};


var addJob = (company, position, dateApplied, source, comments) => {
	var jobs = fetchJobs();
	var job = {
		company,
		position,
		dateApplied,
		source,
		comments
	};

	jobs.push(job);
	saveJobs(jobs);
	return job;
};

var getAll = () => {
	return fetchJobs();
};


var getJob = (company) => {
	var jobs = fetchJobs();
	var filteredJobs = jobs.filter((job) => job.company === company);
	return filteredJobs[0];
};



var removeJob = (company) => {
	var jobs = fetchJobs();
	var filteredJobs = jobs.filter((job) => job.company !== company);
	saveJobs(filteredJobs);

	return jobs.length !== filteredJobs.length;
};

var logJob = (job) => {
	console.log('___');
	console.log(`Company: ${job.company}`);
	console.log(`Position: ${job.position}`);
	console.log(`Date: ${job.dateApplied}`);
	console.log(`Source: ${job.source}`);
	console.log(`Comments: ${job.comments}`);
};

module.exports = {
	addJob,
	getAll,
	getJob,
	removeJob,
	logJob
}

















