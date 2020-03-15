var assert = require('assert');
var TrieSearch = require('trie-search');
var arr = [
    { name: 'bala', age: 30 },
    { name: 'krish', age: 35 },
    { name: 'balki', age: 40 },
    { name: 'krishnan', age: 50 }
];
var ts = new TrieSearch('name');
ts.addAll(arr);

describe('check trie', function () {
    it('should return length 1', function () {
        assert.equal(ts.get("bala").length, 1);
    });
});

describe('check trie case 2', function () {
    it('should return length 2', function () {
        assert.equal(ts.get("bal").length, 2);
    });
});