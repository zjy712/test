const express = require('express');
const router = express.Router();
var request = require('request');

const BoxOffice = require('../../models/BoxOffice');
const passport = require('passport');

// $route GET api/boxoffice/test
// @desc  返回json
// @access public
router.get('/test', (req, res) => {
    res.json({ msg: "BoxOffice works" })
})

router.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {

    //神箭手api
    var options = {
        url: 'https://api.shenjian.io/?appid=5b06c9b972c9896b070f01cbd12a3fea',
    }

    request(options, (err, res1, body) => {
        var info = JSON.parse(body);
        if (info.error_code == 0) {
            const newboxoffice = new BoxOffice({
                data : info.data
            })
            // 储存到本地服务器
            newboxoffice.save()
                .then(boxoffice => res.json({code: 0,data:boxoffice.data}))
                .catch(err => console.log(err))
        } else {
            res.json({ code: 11, msg: '错误' })
        }

    })
})

module.exports = router