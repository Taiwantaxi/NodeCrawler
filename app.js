
var app = require("express")();
var request = require("request");
var fs = require("fs");
var cheerio = require("cheerio");

const PORT = process.env.PORT || 3000

app.get('/',function(req, res){

    console.log(req.body);

    request({
        url: "http://news.ltn.com.tw/list/breakingnews",
        method: "GET"
      }, function(e,r,b) {
        if(e || !b) { return; }
        var $ = cheerio.load(b);
        var result = [];
        var titles = $("ul.list p");
        var imgs = $("ul.list img");
        var times = $("ul.list span");
        var hrefs = $("ul.list a.tit");
        for(var i=0;i<hrefs.length;i++) {
          //result.push($(titles[i]).text());
          //result.push($(titles[i]).attr('src')); 
          var obj = {};          
          obj['title'] = $(titles[i]).text().trim();
          obj['img'] = $(imgs[i]).attr('src');
          obj['time'] = $(times[i]).text();
          obj['href'] = $(hrefs[i]).attr('href');          
          result.push(obj);
        }
        //fs.writeFileSync("result.json", JSON.stringify(result));
        res.send(JSON.stringify(result)); 
      });

});

app.listen(PORT, function(){
    console.log(`App listening on port ${PORT}!`)
});
