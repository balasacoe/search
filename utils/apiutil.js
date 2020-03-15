const fetch = require('node-fetch');
const getData = async (url = '') =>{
    const response = await fetch(url, {
        method: 'GET',
    });
    return await response.json();
}


module.exports = {
    getData
}