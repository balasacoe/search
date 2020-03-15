var assert = require('assert');
const NodeCache = require("node-cache");
const appCache = new NodeCache();


describe('mem cache test', function () {
    function addCache(key, value) {
        appCache.set(key, value);
    }

    it('should return bala', function () {
        addCache("name", "bala")
        assert.equal(appCache.get("name"), "bala");
    });
});