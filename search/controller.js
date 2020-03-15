const { searchService, searchAllService } = require('./services')

const searchController = async (req, res) => {
    let keyword = req.query.query;
    if (keyword) {
        try {
            let data = await searchService(keyword);
            if (data) {
                res.header("Access-Control-Allow-Origin","*");
                res.send(data);
            }
            else {
                res.sendStatus(400);
            }

        } catch (e) {
            console.log(e.message);
            res.sendStatus(500);
        }
    }
    else {
        res.sendStatus(500);
    }
}

const searchAllController = async (req, res) => {
    let keywords = req.body;
    if (keywords && keywords.length > 0) {
        try {
            let data = await searchAllService(keywords);
            if (data) {
                res.header("Access-Control-Allow-Origin","*");
                res.send(data);
            }
            else {
                res.sendStatus(400);
            }

        } catch (e) {
            console.log(e.message);
            res.sendStatus(500);
        }
    }
    else {
        res.sendStatus(500);
    }
}

module.exports = {
    searchController,
    searchAllController
}
