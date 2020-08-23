const crawler = require("../crawler/git_crawler");
const config = require("../config.json");
const fs = require('fs');
const fsPromises = fs.promises;
const { error } = require("console");

const url = config.url.nodejs;
const file_name = "rs_details.json";
async function log(data){
    let rs = JSON.stringify(data,null,4);
    console.log(rs);
}
async function write_to_file(data){
    let rs = JSON.stringify(data,null,4);    
    await fsPromises.appendFile(file_name,rs+"\n");
}
async function write(){
    await fsPromises.writeFile(file_name,"{\n");
    await crawler.write_awesome_data(url, write_to_file);
    await fsPromises.appendFile(file_name,"}");
}
write().then(()=> console.log("Success")).catch(error=> {
    console.error(error);
})

