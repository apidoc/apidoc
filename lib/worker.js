var util = require("util");
var _ = require("underscore");

var app = {};

function Worker(_app)
{
	var self = this;

	// Global Variables
	app = _app;

	// Class Variables
	this.workers = [];

	// Load Worker
	var workers = Object.keys(app.workers);
	workers.forEach(function(worker) {
		var filename = app.workers[worker];
		app.debug("load worker: " + worker + ", " + filename);
		self.addWorker(worker, require(filename));
	});
} // Worker

/**
 * Inherit
 */
util.inherits(Worker, Object);

/**
 * Exports
 */
module.exports = Worker;

/**
 * Add Worker
 */
Worker.prototype.addWorker = function(name, worker)
{
	this.workers.push(worker);
}; // addWorker

/**
 * Execute worker
 */
Worker.prototype.process = function(parsedFiles, parsedFilenames)
{
    var preProcessResults = {};
    this.workers.forEach(function(worker){
        if(worker.preProcess)
        {
            var result = worker.preProcess(parsedFiles, parsedFilenames);
            _.extend(preProcessResults, result);
        }
    });
    this.workers.forEach(function(worker){
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
    });

}; // process
