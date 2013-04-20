/**
 * Test: apidoc.js
 */

// Node Module
var should = require("should");
var fs = require("fs");
var sys = require("sys");
var exec = require("child_process").exec;

/* --------------------------------------------------------------------------------
 * Tests
 * -------------------------------------------------------------------------------- */
describe("apiDoc", function() {

	var fixtureFiles = [
		"api_data.js",
		"api_data.json",
		"api_project.js",
		"api_project.json",
		"index.html"
	];

	before(function(done) {
		done();
	});

	after(function(done) {
		done();
	});

	// create
	it("case 1: should create example in tmp/", function(done) {
		exec("node ./bin/apidoc -i test/fixtures/example/ -o tmp/ -t test/template/", function(err, stdout, stderr) {
			if(err) throw err;
			if(stderr) throw stderr;
			done();
		});
	}); // it

	// check
	it("case 1: should find created files", function(done) {
		fixtureFiles.forEach(function(name) {
			fs.existsSync("./tmp/" + name).should.eql(true);
		});
		done();
	}); // it

	// compare
	it("case 1: created files should equal to fixtures", function(done) {
		var timeRegExp = /"time"\:\s"(.*)"/g;
		var slashesRegExp = /\\\\/g;
		fixtureFiles.forEach(function(name) {
			var fixtureContent = fs.readFileSync("test/fixtures/" + name, "utf8");
			var createdContent = fs.readFileSync("./tmp/" + name, "utf8");

			// windows \r\n to \n
			fixtureContent = fixtureContent.replace(/\r\n/g, "\n");
			createdContent = createdContent.replace(/\r\n/g, "\n");

			// creation time remove.
			fixtureContent = fixtureContent.replace(timeRegExp, "");
			createdContent = createdContent.replace(timeRegExp, "");

			// windows path \\ to /
			fixtureContent = fixtureContent.replace(slashesRegExp, "/");
			createdContent = createdContent.replace(slashesRegExp, "/");

			if(fixtureContent !== createdContent) throw new Error("File ./tmp/" + name + " not equals to test/fixutres/" + name);
		});
		done();
	}); // it

}); // describe