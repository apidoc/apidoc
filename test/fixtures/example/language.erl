% Test for programming language: Erlang

%{
@api {get} /language/erlang Erlang
@apiName GetLanguageErlang
@apiGroup Language
@apiVersion 0.4.0
@apiDescription Test for Erlang Comment-Syntax.
%}

%{
%	@api {get} /language/erlang/indented1 Erlang indented 1
%	@apiName GetLanguageErlangIndented1
%	@apiGroup Language
%	@apiVersion 0.4.0
%	@apiExample Test for indented comment.
%	This is example line 2.
%	This is example line 3.
%		    Line 4 indented (with tab at beginning).
%	    Line 5 indented.
%	This is example line 6.
%}

%{
@api {get} /language/erlang/indented2 Erlang indented 2
@apiName GetLanguageErlangIndented2
@apiGroup Language
@apiVersion 0.4.0
@apiExample Test for indented comment.
This is example line 2.
This is example line 3.
	    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
%}
