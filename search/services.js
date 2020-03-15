const { search, searchAll } = require('./model')

const searchService = async (keyword) => {
    try {
        return search(keyword);
    } catch (e) {
        throw new Error(e.message)
    }
}

const searchAllService = async (keywords) => {
    try {
        return searchAll(keywords);
    } catch (e) {
        throw new Error(e.message)
    }
}
module.exports = {
    searchService,
    searchAllService
}