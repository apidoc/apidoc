/*
 * apidoc
 * http://apidocjs.com
 *
 * Copyright (c) 2013 inveris OHG
 * Author Peter Rottmann <rottmann@inveris.de>
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt)
{
	/* --------------------------------------------------------------------------------
	 * Configuration.
	 * -------------------------------------------------------------------------------- */
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

    // clear temporary dir.
    clean: {
      test: ["tmp"]
    }, // clean

		jshint: {
			all: ["Gruntfile.js", "lib/**/*.js", "test/**/*.js"],
			options: {
				// Enforcing Options
				bitwise: true,
				camelcase: true,
				curly: false,
				eqeqeq: true,
				forin: true,
				immed: true,
				latedef: false,
				newcap: true,
				noarg: true,
				noempty: true,
				nonew: true,
				plusplus: true,
				quotmark: "double",
				regexp: false,
				undef: false,
				unused: false,
				shadow: true,
				strict: false,
				trailing: true,
				maxlen: 160,
				// Relaxing Options
				boss: true,
				eqnull: true,
				smarttabs: true,
				sub: true,
				// Environments
				browser: false,
				passfail: false,
				node: true
			}
		}, // jshint

		simplemocha: {
			options: {
				globals: ["should"],
				timeout: 2000,
				ignoreLeaks: false,
				ui: "bdd",
				reporter: "spec"
			},
			all: { src: ["test/apidoc_test.js"] }
    } // simplemocha
	}); // grunt.initConfig

	/* --------------------------------------------------------------------------------
	 * Modules.
	 * -------------------------------------------------------------------------------- */
  grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-simple-mocha");

	/* --------------------------------------------------------------------------------
	 * Tasks.
	 * -------------------------------------------------------------------------------- */
	// Task: default
	grunt.registerTask("default", ["jshint"]);

	// Task: test
	grunt.registerTask("test", ["clean", "simplemocha"]);
};