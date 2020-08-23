var express = require('express');
var router = express.Router();
const crawler = require("../crawler/git_crawler");
let config = require("../config.json");
/* GET users listing. */
router.get('/',async function(req, res, next) {
  try{
    let data = await crawler.load_list(config.url.java);
    res.send(data);
  }catch(error){
    res.status(500).send(error);
  }
  
  
});

module.exports = router;
