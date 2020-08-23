const crawler = require("../crawler/git_load_list");
const config = require("../config.json");
const fs = require('fs');
const { error } = require("console");


const url = config.url.nodejs;
crawler.load_list(url).then(
    (data) => {
        return new Promise( 
            (resolve, reject) => {
                fs.writeFile("rs.json",JSON.stringify(data, null, 4), (error)=> {
                    if(error){
                        reject(error);

                    }else{
                        resolve();
                    }
                });
            }
        );
    }
).then(()=> {
    console.log("Success");
}).catch(error =>{
    console.error("error in try save to file",error);
});

