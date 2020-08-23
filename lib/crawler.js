const axios = require('axios');
const cheerio = require('cheerio');

async function get_data(craw_url) {
    let res = await axios.get(craw_url);
    if (res && res.status != 200) {
        throw new Error("receive error_code=" + res.status + " fetch data from " + craw_url);
    }
    return res;
}

function parse_html(res) {
    let html = res.data;
    return cheerio.load(html);
}
async function get(url) {
    let res = await get_data(url);
    let $ = parse_html(res);
    return $;
}

module.exports = {
    get, get_data, parse_html
}
