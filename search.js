var TrieSearch = require('trie-search');
const fs = require('fs')
//load the given data into Trie data store
var jsonData = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
var ts = new TrieSearch('summary', { min: 3 });
ts.addAll(jsonData.summaries);

var titles = jsonData.titles;

//search for given string in given dataset
module.exports = function search(keyword){
    if (ts) {
        let summaries = getSummariesForGivenKeyword(keyword);
        if (summaries && summaries.length > 0) {
            return makeBooksFromSummaries(summaries);
        }
    }
    return null;
}

function getSummariesForGivenKeyword(keyword) {
    if (keyword && ts) {
        return ts.get(keyword);
    }
    return null;
}

function makeBookFromSummary(summary) {
    let book = summary;
    let id = summary.id;
    if (titles && titles.length >= id) {
        book.title = titles[id];
    }
    //instead of reading author from api for now creating random number   
    book.author = Math.random();
    return book;
}

function makeBooksFromSummaries(summaries) {
    if (summaries && summaries.length > 0) {
        let bookSet = [];
        for (index in summaries) {
            let summary = summaries[index];
            bookSet.push(makeBookFromSummary(summary));
        }
        return bookSet;
    }
    return null;
}

