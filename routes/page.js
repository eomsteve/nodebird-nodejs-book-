const express = require('express');
const router = express.Router();
router.get('/profile',(req,res)=>{
    res.render('profile',{title:"내 정보 - node bird",user:null});

});

router.get('/join',(req,res)=>{
    res.render('main',{title:"회원가입 - nodebird",user:null,loginError:req.flash('loginError')});

})

router.get('/',(req,res,next)=>{
    res.render('main',{title:"nodebird",twits:[],user:null,loginError:req.flash('loginError')});

})
module.exports = router;
