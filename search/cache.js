const NodeCache = require("node-cache");
const appCache = new NodeCache();

//add in given cache
const addInMemCache = (key, value) => {
    if (appCache) {
        return appCache.set(key, value);
    }
}
//search all given words
const getFromMemCache = (key) => {
    if (appCache) {
        return appCache.get(key);
    }
    return null;
}


module.exports = {
    addInMemCache,
    getFromMemCache
}