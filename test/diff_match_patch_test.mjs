import assert from 'assert';
import DiffMatchPatch from '../template/src/diff_match_patch.mjs';

const diffMatchPatch = new DiffMatchPatch(true);

describe('test Diff Match Patch module', () => {

  it('should find a equality', done => {
    const r = diffMatchPatch.diffMain('There is no difference', 'There is no difference');
    assert.deepEqual(r, [ [ 0, 'There is no difference' ] ]);
    done();
  });

  it('should find a update', done => {
    const r = diffMatchPatch.diffMain('There is a difference', 'There is one difference');
    assert.deepEqual(r, [ [ 0, 'There is ' ], [ -1, 'a' ], [ 1, 'one' ], [ 0, ' difference' ] ]);
    done();
  });

  it('should find a deletion', done => {
    const r = diffMatchPatch.diffMain('There is a difference', 'There is difference');
    assert.deepEqual(r, [ [ 0, 'There is ' ], [ -1, 'a ' ], [ 0, 'difference' ] ]);
    done();
  });

  it('should find a addition', done => {
    const r = diffMatchPatch.diffMain('There is a difference', 'There is a minor difference');
    assert.deepEqual(r, [ [ 0, 'There is a ' ], [ 1, 'minor ' ], [ 0, 'difference' ] ]);
    done();
  });

});
