module.exports = {
    mongoURI:"mongodb://47.94.194.153:27017",
    secretOrkey: "secret",
    doubanOptions: {
        movieUrl: 'https://api.douban.com/v2/movie/subject/',
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Transfer-Encoding': 'chunked'
        }
    }
}