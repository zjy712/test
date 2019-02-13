var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var mime = require('mime');


var urList = ['index', 'new'];

http.createServer(function (req, res) {

    req.url = req.url.toLowerCase();
    req.method = req.method.toLowerCase();

    if (req.url === '/' || req.url === '/index' && req.method === 'get') {
        render(path.join(__dirname, 'html', 'index.html'), res)

    } else if (req.url === '/new' && req.method === 'get') {
        render(path.join(__dirname, 'html', 'new.html'), res)
    } else if (req.url.startsWith('/add') && req.method === 'get') {

        var urlObj = url.parse(req.url, true);
        fs.readFile(path.join(__dirname, 'data', 'data.json'), function (err, data) {
            if (err && err.code !== 'ENOENT') {
                throw err;
            }
            var list = JSON.parse(data || '[]')

            list.push(urlObj.query);
            urlObj.query.id = list.length;
            fs.writeFile(path.join(__dirname, 'data', 'data.json'), JSON.stringify(list), function (err) {
                if (err) {
                    throw err;
                }
                console.log('ok');
                res.statusCode = 302;
                res.statusMessage = 'Found';
                res.setHeader('Location', '/');
                res.end();
            });
            console.log(list);
        })
    } else if (req.url === '/add' && req.method === 'post') {
        // render( path.join(__dirname,'html','add.html'),res)
        console.log('new start');
    } else if (req.url.startsWith('/resource') && req.method === 'get') {
        // render( path.join(__dirname,'html','add.html'),res)
        fs.readFile(path.join(__dirname, req.url), function (err, data) {
            if (err) {
                throw err;
            }
            res.setHeader('Content-Type', mime.getType(req.url));
            res.end(data);;
        })
    }
}).listen(9000, function () {
    console.log('start');
})


function render(filename, res) {
    fs.readFile(filename, function (err, data) {
        if (err) {
            res.writeHead(404, 'Not Found', { 'Content-Type': 'text/html' })
        }
        res.setHeader('Content-Type', 'text/html')
        res.end(data);
    });

}