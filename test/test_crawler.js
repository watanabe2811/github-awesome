const config = require("../config.json");

const crawler = require("../lib/crawler");

crawler.get_data(config.url.nodejs).then(
    (res)=> {
        console.log(res.data);
    }
).catch(console.error)


