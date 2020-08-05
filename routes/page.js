const express = require('express');
const router = express.Router();
const {isLoggedIn , isNotLoggedIn} = require('./middlewares.js');
const {Post, User} = require('../models');

router.get('/',(req,res,next) => {
    Post.findAll({
        include:{
            model:User,
            attribute:['id','nick'],
        },
        order:[['createdAt','DESC']],

    })
    .then((posts)=>{
        res.render('main',{title:'Nodebird',twits:posts,user:req.user,loginError:req.flash('Error')});

    })
    .catch((error)=>{
        console.error(error);
        next(error);
    })
})

router.get('/profile',isLoggedIn,(req,res)=>{
    res.render('profile',{title:"내 정보 - node bird",user:req.user});

});

router.get('/join',isNotLoggedIn,(req,res)=>{
    res.render('join',{title:"회원가입 - nodebird",user:req.user,loginError:req.flash('loginError')});

})

router.get('/',(req,res,next)=>{
    res.render('main',{title:"nodebird",twits:[],user:req.user,loginError:req.flash('loginError')});

})
module.exports = router;
