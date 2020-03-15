var TrieSearch = require('trie-search');
const {getData} = require('../utils/apiutil');
const fs = require('fs')
const { getFromMemCache, addInMemCache } = require('./cache');

//load the given data into Trie data store
var jsonData = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
var ts = new TrieSearch('summary', { min: 3 });
ts.addAll(jsonData.summaries);

var titles = jsonData.titles;

//search only given string
const search = async (keyword) => {
    if (ts) {
        let summaries = getSummariesForGivenKeyword(keyword);
        if (summaries && summaries.length > 0) {
            return await makeBooksFromSummaries(summaries);
        }
    }
    return null;
}
//search all given words
const searchAll = async (keywords) => {
    let bookSet = [];
    if (keywords) {
        for (keyword of keywords) {
            bookSet.push(await search(keyword));
        }
        return bookSet;
    }
    return null;
}

function getSummariesForGivenKeyword(keyword) {
    if (keyword && ts) {
        return ts.get(keyword);
    }
    return null;
}

async function makeBookFromSummary(summary) {
    let book = summary;
    let id = summary.id;
    if (titles && titles.length >= id) {
        book.title = titles[id];
    }
    let author = getFromMemCache(id);
    if (!author) {
        //call API here for author
        //author = Math.random();
        await getData(`https://us-central1-mycoludfunction.cloudfunctions.net/getAuthorBasedOnId?bookId=${id}`).then((data) => {
            if (data && data.author) {
                author = data.author;
                addInMemCache(id, author);
            }
        });
    }
    book.author = author;
    return book;

}

async function makeBooksFromSummaries(summaries) {
    if (summaries && summaries.length > 0) {
        let bookSet = [];
        for (index in summaries) {
            let summary = summaries[index];
            bookSet.push(await makeBookFromSummary(summary));
        }
        return bookSet;
    }
    return null;
}

module.exports = {
    search,
    searchAll
}
