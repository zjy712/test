const express = require('express');
const router = express.Router();
var request = require('request');

const keys = require('../../config/keys')

const Paragraph = require('../../models/Paragraph');

const passport = require('passport')


// $route GET api/movieinfo/test
// @desc  返回json
// @access public
router.get('/test', (req, res) => {
    res.json({ msg: "Paragraph works" })
})


// $route GET api/movieinfo/
// @desc  返回json
// @access public
router.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({ code: 11, msg: '电影ID错误' })
})

// $route GET api/movieinfo/:id
// @desc  返回json
// @access public
router.get('/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
    var id = req.params.id;

    async function parentData() {
        return new Promise((resolve,err) => {
            Paragraph.find({ movie_id: id}).lean()
                .then((paragraph) => {
                    resolve(paragraph)
                })
                .catch(err => {
                    res.json({ code: 11, msg: '查询失败' })
                })
        }).then(paragraph => {
            return paragraph
        })
        
    }
    // async function childDate(data) {
    //     console.log(data);
    //     if (data.children_paragraph != 0) {
    //         return new Promise((resolve, err) => {
    //             Paragraph.find({ movie_id: id, parent_paragraph: data.paragraph_id })
    //                 .then((childrens) => {
    //                 // data.children = childrens;
    //                  resolve(childrens)
    //             })
    //         }).then(children => {
    //             return children
    //         })
    //     } else {
    //         return []
    //     }
    // }
    async function getParagraph() {
        var data = await parentData(data); 
        // await childDate(data);
        res.json({ code: 11, data:data })
    }
    getParagraph();
    // Paragraph.find({ movie_id: id, parent_paragraph:0})
    //     .then((paragraph) => {
    //         paragraph.forEach(ele => {
    //             if (ele.children_paragraph != 0) {
    //                 Paragraph.find({ movie_id: id, parent_paragraph: ele.paragraph_id })
    //                     .then((childrens) => {
    //                         ele.children = childrens;
                            
    //                     })
    //             }
                
    //         })
    //         res.json({ code: 11, paragraph })
    //     })
    //     .catch(err => {
    //         res.json({ code: 11, msg: '查询失败' })
    //     })
})

// $route POST api/movieinfo/update:id
// @desc  返回json 想看，点赞
// @access public

router.post('/update/:id', passport.authenticate("jwt", { session: false }), (req, res) => {

    const newMovieinfo = {
        type: req.body.type,
        descibe: req.body.descibe,
        income: req.body.income,
        expend: req.body.expend,
        cash: req.body.cash,
        remark: req.body.remark,
    };
    Movieinfo.findOneAndUpdate({ _id: req.params.id }, { $set: newMovieinfo }, { new: true })
        .then(movieinfo => res.json(movieinfo))
})

// $route POST api/movieinfo/add
// @desc  返回json
// @access public
router.post('/add', passport.authenticate("jwt", { session: false }), (req, res) => {
    // res.json({ msg: "Movieinfo works" })
    Paragraph.count({}).then(data => {
        length = data+1;
        console.log(length);
        const newParagraph = {
            paragraph_id: length,
            movie_id: req.body.movie_id,
            user_name: req.body.user_name,
            user_avatar: req.body.user_avatar,
            content: req.body.content,
        };
        new Paragraph(newParagraph).save()
            .then(paragraph => res.json({ code: 11, msg: 'success', data: paragraph }))

    })
    
})

// $route POST api/movieinfo/edit
// @desc  返回json
// @access public
router.post('/edit/:id', passport.authenticate("jwt", { session: false }), (req, res) => {

    const newMovieinfo = {
        type: req.body.type,
        descibe: req.body.descibe,
        income: req.body.income,
        expend: req.body.expend,
        cash: req.body.cash,
        remark: req.body.remark,
    };
    Movieinfo.findOneAndUpdate({ _id: req.params.id }, { $set: newMovieinfo }, { new: true })
        .then(movieinfo => res.json(movieinfo))

})

// $route POST api/movieinfo/delete
// @desc  返回json
// @access public
router.post('/delete/:id', passport.authenticate("jwt", { session: false }), (req, res) => {

    Movieinfo.findByIdAndRemove({ _id: req.params.id })
        .then(movieinfo => {
            movieinfo.save().then(movieinfo => res.json(movieinfo))
        })
        .catch(err => res.status(404).json('删除失败！'))
})


module.exports = router