var fs = require('fs');
var readline = require('readline');
var client = require('cheerio-httpcli');
var async = require('async');

//ファイル読み込み
var rs = fs.createReadStream('./urllist.txt');
var rl = readline.createInterface(rs, {});
var url = [];
var urllist = [];

fs.unlink('./result.txt', function (err) {});
rl.on('line', function(line) {
   url.push(line);
}).on('close', function() {
   geturl(url);
});

function geturl(url){
    url.forEach(function(line){
    client.fetch(line, {}, function(err, $, res) {
        if (err) { console.log("error"); return; }
        $("item > link").each(function(idx) {
            var title = $(this).text();
            fs.appendFileSync('./result.txt', title, 'utf-8');
            fs.appendFileSync('./result.txt', "\n", 'utf-8');
         });
    });
});
}



//#main > div.mainBox > div.topicsDetail > div.headline.hasImg > div.headlineTxt > h2
//#main > div.mainBox > div.topicsDetail > div.headline.hasImg > div.headlineTxt > p
