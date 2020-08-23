const crawler = require("../lib/crawler");


async function get_project_info(url){
    console.log("try get project info "+url);
    let $ = await crawler.get(url);
    let git_clone_url= get_clone_url($);
    return {
        "url" : url,
        "url_clone" : get_clone_url($),
        "metadata" : get_metadata($)
    };
}

function get_clone_url($){
    return $('clipboard-copy').attr('value');
}
function trim(str){
    if(str){
        return str.trim();
    }else{
        return str;
    }
}
function get_metadata($){
    let ul= $('#js-repo-pjax-container > div > div > ul > li');
    let rs = {};
    ul.each(
        (index, li)=> {
            let type = trim($('a.btn-with-count ',li).text()).toLocaleLowerCase();
            let a= $('a.social-count',li);
            let text = trim($(a).text());
            let label= trim($(a).attr("aria-label"));
            let count;
            try{
                if(label){
                    count = parseInt(label.replace(/^(\d+)\s+.*$/, "$1"));
                    rs[type]= {
                        "count_str" : text,
                        "label" : label,
                        "count" : count
                    };
                }
                
            }catch(err){
                console.warn("can't get count number from label "+label);
            }
            
            
        }
    );
    return rs;
    
    
}

module.exports = {
    get_project_info
}