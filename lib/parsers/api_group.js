function parse(content) {
	// trim
	var group = content.replace(/^\s*|\s*$/g, '');

	if (group.length === 0)
        return null;

	return {
		group: group.replace(/(\s+)/g, '_')
	};
}

/**
 * Exports
 */
module.exports = {
	parse : parse,
    path  : 'local',
    method: 'insert'
};
