const crawler = require("../crawler/git_project_crawler");
const config = require("../config.json");
const fs = require('fs');

let url="https://github.com/Yalantis/uCrop";

url= "https://github.com/feross/webtorrent";


crawler.get_project_info(url).then(
    (data)=> {
        console.log(data)
    }
).catch(
    (err)=> {
        console.error(err);
    }
)
