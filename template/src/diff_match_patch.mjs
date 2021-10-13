import _DiffMatchPatch from 'diff-match-patch';

export default class DiffMatchPatch extends _DiffMatchPatch {
  constructor (testMode) {
    super();
    this.testMode = testMode;
  }

  diffMain (text1, text2, optChecklines, optDeadline) {
    return super.diff_main(this._stripHtml(text1), this._stripHtml(text2), optChecklines, optDeadline);
  }

  diffPrettyHtml (diffs) {
    const html = [];
    const patternAmp = /&/g;
    const patternLt = /</g;
    const patternGt = />/g;
    const patternPara = /\n/g;
    for (let x = 0; x < diffs.length; x++) {
      const op = diffs[x][0]; // Operation (insert, delete, equal)
      const data = diffs[x][1]; // Text of change.
      const text = data.replace(patternAmp, '&amp;').replace(patternLt, '&lt;')
        .replace(patternGt, '&gt;').replace(patternPara, '&para;<br>');
      switch (op) {
        case _DiffMatchPatch.DIFF_INSERT:
          html[x] = '<ins>' + text + '</ins>';
          break;
        case _DiffMatchPatch.DIFF_DELETE:
          html[x] = '<del>' + text + '</del>';
          break;
        case _DiffMatchPatch.DIFF_EQUAL:
          html[x] = '<span>' + text + '</span>';
          break;
      }
    }
    return html.join('');
  }

  diffCleanupSemantic (diffs) {
    return this.diff_cleanupSemantic(diffs);
  }

  _stripHtml (html) {
    // no document object with CLI when running tests
    if (this.testMode) { return html; }
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }
}
