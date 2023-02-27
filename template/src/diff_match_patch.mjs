import _DiffMatchPatch from 'diff-match-patch';

export default class DiffMatchPatch extends _DiffMatchPatch {
  constructor (testMode) {
    super();
    this.testMode = testMode;
  }

  diffMain (text1, text2, optChecklines, optDeadline) {
    return super.diff_main(this._stripHtml(text1), this._stripHtml(text2), optChecklines, optDeadline);
  }

  diffLineMode (text1, text2) {
    const a = this.diff_linesToChars_(text1, text2);
    const lineText1 = a.chars1;
    const lineText2 = a.chars2;
    const lineArray = a.lineArray;
    const diffs = super.diff_main(lineText1, lineText2, false);
    this.diff_charsToLines_(diffs, lineArray);
    return diffs;
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

  diffPrettyCode (diffs) {
    const html = [];
    const patternPara = /\n/g;
    for (let x = 0; x < diffs.length; x++) {
      const op = diffs[x][0]; // Operation (insert, delete, equal)
      const text = diffs[x][1]; // Text of change.
      const lb = text.match(patternPara) ? '' : '\n';
      switch (op) {
        case _DiffMatchPatch.DIFF_INSERT:
          html[x] = text.replace(/^(.)/gm, '+ $1') + lb;
          break;
        case _DiffMatchPatch.DIFF_DELETE:
          html[x] = text.replace(/^(.)/gm, '- $1') + lb;
          break;
        case _DiffMatchPatch.DIFF_EQUAL:
          html[x] = text.replace(/^(.)/gm, '  $1');
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
