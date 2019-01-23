var http = require('http')
var fs = require('fs')
var path = require('path')
var url = require('url')

var urList = ['index','new'];

http.createServer(function (req, res) {
    
    req.url = req.url.toLowerCase();
    req.method = req.method.toLowerCase();

    if (req.url === '/' || req.url === '/index' && req.method === 'get') {
        render( path.join(__dirname,'html','index.html'),res)
    } else if ( req.url === '/new' && req.method === 'get') {
        render( path.join(__dirname,'html','new.html'),res)
    } else if ( req.url.startsWith('/add') && req.method === 'get') {
        // render( path.join(__dirname,'html','add.html'),res)
        
        var urlObj = url.parse(req.url, true);
        var list = [];
        list.push(urlObj.query);
        console.log(list);
        res.end('add ok')
    } else if ( req.url === '/add' && req.method === 'post') {
        // render( path.join(__dirname,'html','add.html'),res)
        console.log('new start');
        
    } 
}).listen(9000,function () {
    console.log('start');
})


function render(filename, res) {
    fs.readFile(filename, function (err, data) {
        if (err) {
            res.writeHead(404,'Not Found',{'Content-Type': 'text/html'})
        }
        res.setHeader('Content-Type','text/html')
        res.end(data);
    });
    
}