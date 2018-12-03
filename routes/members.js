var express = require('express');
var router = express.Router();
var Member = require('../models/member');
var passport = require('passport');



/*REGISTER MEMBER*/
router.post('/memberadd', function (req, res, next) {
    addToDB(req, res);
});

async function addToDB(req, res) {

    var member = new Member({
        room: req.body.room,
        membername: req.body.membername,
        mail: req.body.mail,
        tel: req.body.tel,
        password: Member.hashPassword(req.body.password),
        credit: req.body.credit,
        creation_dt: Date.now()
    });

    try {
        doc = await member.save();
        return res.status(201).json(doc);
    }
    catch (err) {
        return res.status(501).json(err);
    
    }
}

/*GET ALL MEMBERS*/
router.get('/member', function (req, res) {
    Member.find({}, (err, members) => {
        if (err)
            res.status(500).json({ errmsg: err });
        res.status(200).json({ msg: members });
    });
});



/*DELETE MEMBER*/
router.delete('/member/:id', function (req, res,next){
    Member.findOneAndRemove({_id:req.params.id},(err,member)=> {
        if (err)
            res.status(500).json({ errmsg: err });
        res.status(200).json({ msg:member});
    });
});

/*UPDATE MEMBER */
router.put('/update/:id',function(req,res){
    Member.findByIdAndUpdate({_id:req.params.id},
        {$set: 
            {room: req.body.room,
            membername: req.body.membername,
            mail: req.body.mail,
            tel: req.body.tel,
            credit: req.body.credit},
            
    },{
        new:true
    },(err,members)=>{
         if (err)
            res.status(500).json({ errmsg: err });
        res.status(200).json({ msg: members });
    });

 });


/*Login*/
router.post('/login', function (req, res, next) {
    passport.authenticate('member-local', function (err, member, info) {
        if (err) { return res.status(501).json(err); }
        if (!member) { return res.status(501).json(info); }
        req.logIn(member, function (err) {
            if (err) { return res.status(501).json(err); }
            return res.status(200).json({ message: 'Login Success' });
        });
    })(req, res, next);
});

router.get('/dashbord', isValidUser, function (req, res, next) {
    return res.status(200).json(req.user);
});

router.get('/logout', isValidUser, function (req, res, next) {
    req.logout();
    return res.status(200).json({ message: 'Logout Success' });
});

function isValidUser(req, res, next) {
    if (req.isAuthenticated('member-local')) next();
    else return res.status(401).json({ message: 'Unauthorized Request' });
}

module.exports = router;