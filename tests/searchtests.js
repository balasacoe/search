const search=require('../search');
var assert = require('assert');


describe('check search', function () {
    it('should return length 4', function () {
        assert.equal(search("is your problems").length, 4);
    });
});

describe('check search case 2', function () {
    it('should return null', function () {
        assert.equal(search("xxxx"), null);
    });
});