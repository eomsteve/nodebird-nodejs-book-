const express = require('express');

const {isLoggedIn} = require('./middlewares.js');
const {User } = require('../models');

const router = express.Router();

router.post('/:id/follow',isLoggedIn,async(req,res,next)=>{
    try{
        const user = await User.findOne({id: req.user.id});
        await user.addFollowing(parseInt(req.params.id,10));
        res.send('success');
    }catch(err){
        console.error(err);
        return next(err);
        
    }
});
module.exports = router;