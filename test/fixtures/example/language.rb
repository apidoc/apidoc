# Test for programming language: Ruby

=begin
@api {get} /language/ruby Ruby
@apiName GetLanguageRuby
@apiGroup Language
@apiVersion 0.4.0
@apiDescription Test for Ruby Comment-Syntax.
=end

=begin
	@api {get} /language/ruby/indented1 Ruby indented 1
	@apiName GetLanguageRubyIndented1
	@apiGroup Language
	@apiVersion 0.4.0
	@apiExample Test for indented comment.
	This is example line 2.
	This is example line 3.
		    Line 4 indented (with tab at beginning).
	    Line 5 indented.
	This is example line 6.
=end

=begin
@api {get} /language/ruby/indented2 Ruby indented 2
@apiName GetLanguageRubyIndented2
@apiGroup Language
@apiVersion 0.4.0
@apiExample Test for indented comment.
This is example line 2.
This is example line 3.
	    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
=end
