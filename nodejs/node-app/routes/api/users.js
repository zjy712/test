// login & register
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')

// $route GET api/users/test
// @desc  返回json
// @access public
router.get('/test',(req,res) => {
    res.json({msg:"login works"})
})

// $route POST api/users/register
// @desc  返回json
// @access public
router.post('/register', (req, res) => {
    // console.log(req.body);

    User.findOne({email:req.body.email})
        .then((user) => {
            if (user) {
                return res.status(400).json({email:'邮箱已被注册'})
            } else {
                var avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
                const newUser = new User({
                    name:req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
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
module.exports = router