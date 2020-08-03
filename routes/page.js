import express from 'express';
const router = express.Router();
router.get('/profile',(req,res)=>{
    res.render('profile',{title:"내 정보 - node bird",user:null});

});

router.get('/join',(req,res)=>{
    res.render('main',{title:"nodebird",twits:[],user:null,loginError:req.flash('loginError')});

})

module.exports = router;
