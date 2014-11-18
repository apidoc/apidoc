# Test for programming language: Perl

#**
# @api {get} /language/perl Perl
# @apiName GetLanguagePerl
# @apiGroup Language
# @apiVersion 0.4.0
# @apiDescription Test for Perl Comment-Syntax.
#*

#**
# @api {get} /language/perl/indented1 Perl indented 1
# @apiName GetLanguagePerlIndented1
# @apiGroup Language
# @apiVersion 0.4.0
# @apiExample Test for indented comment.
# This is example line 2.
# This is example line 3.
#		Line 4 indented (with tab at beginning).
#	Line 5 indented.
# This is example line 6.
#*

#**
@api {get} /language/perl/indented2 Perl indented 2
@apiName GetLanguagePerlIndented2
@apiGroup Language
@apiVersion 0.4.0
@apiExample Test for indented comment.
This is example line 2.
This is example line 3.
	    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
#*

=pod
@api {get} /language/perl/podcut Perl comment with pod and cut
@apiName GetLanguagePerlPodCut
@apiGroup Language
@apiVersion 0.4.0
@apiExample Test for indented comment.
This is example line 2.
This is example line 3.
        Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
=cut
