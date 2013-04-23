var util = require("util");
var _ = require("underscore");
var semver = require("semver");

var app = {};

function Worker(_app)
{
	var self = this;

	// Globale Variablen
	app = _app;

	// Klassenvariablen
	this.workers = [];

	// Process laden
	var workers = Object.keys(app.workers);
	workers.forEach(function(worker) {
		var filename = app.workers[worker];
		app.debug("load worker: " + worker + ", " + filename);
		self.addWorker(worker, require(filename));
	});
} // Worker

/**
 * Vererben.
 */
util.inherits(Worker, Object);

/**
 * Exports.
 */
module.exports = Worker;

/**
 * Worker hinzufügen.
 */
Worker.prototype.addWorker = function(name, worker)
{
	this.workers.push(worker);
}; // addWorker

/**
 * Ausführung.
 */
Worker.prototype.process = function(parsedFiles, parsedFilenames)
{
	var self = this;
	var preProcessResults = {};

	// Workers preProcess
	for(var i = 0; i < self.workers.length; i += 1)
	{
		var worker = self.workers[i];
		if(worker.preProcess)
		{
			var result = worker.preProcess(parsedFiles, parsedFilenames);
			_.extend(preProcessResults, result);
		}
	} // for

	// Workers postProcess
	for(var i = 0; i < self.workers.length; i += 1)
	{
		var worker = self.workers[i];
		if(worker.postProcess)
		{
			try
			{
				worker.postProcess(parsedFiles, parsedFilenames, preProcessResults);
			}
			catch(e)
			{
				throw e;
			}
		}
	} // for
}; // process