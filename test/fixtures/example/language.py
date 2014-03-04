# Test for programming language: Python

"""
@api {get} /language/python Python
@apiName GetLanguagePython
@apiGroup Language
@apiVersion 0.4.0
@apiDescription Test for Python Comment-Syntax.
"""

"""
	@api {get} /language/python/indented1 Python indented 1
	@apiName GetLanguagePythonIndented1
	@apiGroup Language
	@apiVersion 0.4.0
	@apiExample Test for indented comment.
	This is example line 2.
	This is example line 3.
		    Line 4 indented (with tab at beginning).
	    Line 5 indented.
	This is example line 6.
"""

"""
@api {get} /language/python/indented2 Python indented 2
@apiName GetLanguagePythonIndented2
@apiGroup Language
@apiVersion 0.4.0
@apiExample Test for indented comment.
This is example line 2.
This is example line 3.
	    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
"""
