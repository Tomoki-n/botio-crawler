var fs = require('fs');
var readline = require('readline');
var client = require('cheerio-httpcli');
var async = require('async');

//ファイル読み込み
var rs = fs.createReadStream('./result.txt');
var rl = readline.createInterface(rs, {});
var url = [];
var urllist = [];

rl.on('line', function(line) {
   url.push(line);
}).on('close', function() {
   geturl(url);
});

function geturl(url){
    url.forEach(function(line){
    client.fetch(line, {}, function(err, $, res) {
        if (err) { console.log("error"); return; }
        var contents = $('#main > div.mainBox > div.topicsDetail > div.headline.hasImg > div.headlineTxt > p').text();
         fs.appendFileSync('./result2.txt', contents, 'utf-8');
         fs.appendFileSync('./result2.txt', "\n", 'utf-8');
    });
});
}




