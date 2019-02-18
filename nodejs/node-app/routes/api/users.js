// login & register
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')

const keys = require('../../config/keys')

const jwt = require('jsonwebtoken');
const passport = require('passport')


// $route GET api/users/test
// @desc  返回json
// @access public
router.get('/test', (req, res) => {
    res.json({ msg: "login works" })
})

// $route POST api/users/register
// @desc  返回json
// @access public
router.post('/register', (req, res) => {
    // console.log(req.body);

    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json({ email: '邮箱已被注册' })
            } else {
                var avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                    identity: req.body.identity
                })

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            throw err
                        }
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    });
                });
            }
        })
})

// $route POST api/users/login
// @desc  返回token jwt passport
// @access public

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //查询数据库
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ mgs: '用户不存在' })
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //   res.json({mgs:'success'})
                        const rule = {
                            id: user.id,
                            name: user.name,
                            identity: user.identity
                        }
                        jwt.sign(rule, keys.secretOrkey, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                        })
                    } else {
                        return res.status(404).json({ mgs: '密码错误' })
                    }

                })
        })
})

// $route GET api/users/current
// @desc  返回 current user
// @access private
router.get('/current', passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity,
    });
})
module.exports = router