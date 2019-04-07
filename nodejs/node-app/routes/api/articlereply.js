const express = require('express');
const router = express.Router();
var request = require('request');

const keys = require('../../config/keys')

const Paragraph = require('../../models/Paragraph');
const ArticleReply = require('../../models/ArticleReply');
// const UserActive = require('../../models/UserAcive');

const Module_Active = require('../../modules/Module_Active');

const passport = require('passport')


router.get('/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
    var id = req.params.id;

    async function getLength() {
        return new Promise((resolve, err) => {
            ArticleReply.countDocuments({ article_id: id }).then(data => {
                resolve(data);
            })
        })
    };

    async function parentData() {
        return new Promise((resolve, err) => {
            ArticleReply.find({ article_id: id }).sort({ date: -1 }).limit(5).lean()
                .then((articlereply) => {
                    resolve(articlereply)
                })
                .catch(err => {
                    res.json({ code: 11, msg: '查询失败' })
                })
        }).then(articlereply => {
            return articlereply
        })
    }

    async function getArticleReply() {
        var data = await parentData();
        var totalnum = await getLength();
        // await childDate(data);
        res.json({ code: 11, data: data, totalnum })
    }
    getArticleReply();
})


router.post('/add', passport.authenticate("jwt", { session: false }), (req, res) => {
    // res.json({ msg: "Movieinfo works" })

    async function getLength() {
        return new Promise((resolve, err) => {
            ArticleReply.countDocuments({}).then(data => {
                resolve(data);
            })
        })
    };

    async function addDB(newArticleReply) {
        return new Promise((resolve, err) => {
            new ArticleReply(newArticleReply).save()
                .then(article => {
                    resolve(article);
                })
        }).then(article => {
            res.json({ code: 11, msg: 'success', data: article })
        })
    }

    async function add() {
        var articleReply_id = await getLength() + 1;
        const newArticleReply = {
            articleReply_id: articleReply_id,
            article_id: req.body.article_id,
            user_name: req.body.user_name,
            user_avatar: req.body.user_avatar,
            reply_name: req.body.reply_name,
            reply_avatar: req.body.reply_avatar,
            content: req.body.content,
        };
        await addDB(newArticleReply);

        // 记录操作
        const newUserActive = {
            user_name: newArticleReply.user_name,
            type: 'ArticleReply',
            type_id: articleReply_id
        };
        Module_Active.save(newUserActive)
    }
    add()

})


module.exports = router