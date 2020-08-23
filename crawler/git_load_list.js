const crawler = require('../lib/crawler');

const ARTICLE_SELECTOR = '#readme > div > article';
async function load_list(url){
    let $ = await crawler.get(url);
    let list= $(ARTICLE_SELECTOR).children();
    let data = {
        "list" : [],
        "details" : []
    };
    let current_header={};
    list.each(
        (index, element) => {
            switch(element.name){
                case 'h2':
                case 'h3':
                    current_header={
                        "tag" : element.name,
                        "text": $(element).text(),
                        "href" : $('a',element).attr('href')
                    };
                    break;
                case 'ul':
                    if(current_header){
                        if(current_header.tag!='h3'){
                            data.list.push({
                                "type" : current_header.text,
                                "href" : current_header.href,
                                "items" : process_list_item(element,$)
                            });
                                
                        }else if(current_header.tag=='h3'){
                            data.details.push({
                                "type" : current_header.text,
                                "href" : current_header.href,
                                "items" : process_list_item(element,$)
                            });
                        }
                    }
                    
                    break;
            }
        }        
    )
    return data;
}
function process_list_item(ul_element,$){
    let ul_data = [];
    $("li", ul_element).each(
        (index, li) => {
            let text = $(li).text();
            let href= $("a",li).attr("href");
            ul_data.push( {
                "id" : index,
                "desc" : text,
                "href" : href
            })
        }
    );
    return ul_data;
}
module.exports = {
    load_list
}



