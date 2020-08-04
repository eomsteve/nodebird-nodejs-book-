const express = require('express');
const router = express.Router();
const {isLoggedIn , isNotLoggedIn} = require('./middlewares.js');

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
