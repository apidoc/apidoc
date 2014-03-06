# Test for programming language: CoffeeScript

###
@api {get} /language/coffeescript CoffeeScript
@apiName GetLanguageCoffeeScript
@apiGroup Language
@apiVersion 0.4.0
@apiDescription Test for CoffeeScript Comment-Syntax.
###

###
	@api {get} /language/coffeescript/indented1 CoffeeScript indented 1
	@apiName GetLanguageCoffeeScriptIndented1
	@apiGroup Language
	@apiVersion 0.4.0
	@apiExample Test for indented comment.
	This is example line 2.
	This is example line 3.
		    Line 4 indented (with tab at beginning).
	    Line 5 indented.
	This is example line 6.
###

###
@api {get} /language/coffeescript/indented2 CoffeeScript indented 2
@apiName GetLanguageCoffeeScriptIndented2
@apiGroup Language
@apiVersion 0.4.0
@apiExample Test for indented comment.
This is example line 2.
This is example line 3.
	    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
###
