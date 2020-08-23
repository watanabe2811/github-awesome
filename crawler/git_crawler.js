const list_crawler = require('./git_load_list');
const project_crawler = require('./git_project_crawler');

async function load_awesome(url) {    
    let list = await list_crawler.load_list(url);
    let links = list.details;
    for (const category of links) {
        let items = category.items;
        let urls = items.map((item) => item.href);
        let info = await load_links_parallel(urls);
        rs.push(
            {
                "category": category.type,
                "count": items.length,
                "info": info
            });
    }
    return rs;

}
async function write_awesome_data(url, write){
    let list = await list_crawler.load_list(url);
    let links = list.details;
    for (const category of links) {
        let items = category.items;
        let urls = items.map((item) => item.href);
        let count = items.length;
        let c = category.type;
        for(const url of urls){
            let info = await load_info(url);
            await write({
                "category" : c,
                "count" : count,
                "info" : info
            });
        }
    }
    
}
async function load_links_parallel(urls) {
    let rs = [];
    let tasks = urls.map(
        async (url) => {
            let info = await load_info(url);
            rs.push(rs);
        }
    );
    await Promise.all(tasks);
}
async function load_info(url) {
    try{
        let info = {};
        if (url.startsWith("https://github.com/")) {
            info = await project_crawler.get_project_info(url)
        }
        return info;
    }catch(err){
        console.warn("error in try load info from "+url,err);
        return {};
    }    
}
async function load_links_serial(urls) {
    let rs = [];
    for (const url of urls) {
        let info = await load_info(url);
        rs.push(info);
    }
    return rs;
}
module.exports = {
    load_list: list_crawler.load_list,
    load_project_info: project_crawler.get_project_info,
    load_awesome,
    write_awesome_data
}