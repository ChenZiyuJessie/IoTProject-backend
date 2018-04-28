var express = require('express');
var router = express.Router();
var Member = require('../models/member');


/*SAVE MEMBER*/
router.post('/memberadd', function (req, res, next) {
    addToDB(req, res);
});


async function addToDB(req, res) {

    var member = new Member({
        room: req.body.room,
        membername:req.body.membername,
        email:req.body.email,
        tel:req.body.tel,
        password: Member.hashPassword(req.body.password),
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


/*GET ALL MEMBERS */
router.get('/member', function (req, res, next) {
    Member.find({}, (err, members) => {
        if (err)
            res.status(500).json({ errmsg: err });
        res.status(200).json({msg:members });
    });
});
   
/*UPDATE MEMBER*/
router.put('/memberupdate', function (req, res, next) {
    Member.findById(req.body._id, (err, member) => {
        if (err)
            res.status(500).json({ errmsg: err });
        member.room = req.body.room;
        member.membername = req.body.membername;
        member.email=req.body.email;
        member.tel=req.body.tel;
        member.save((err, member) => {
            if (err)
                res.status(500).json({ errmsg: err });

            res.status(200).json({ msg: member });

        });
    })
    
    });

/*DELETE MEMBER */
router.delete('memberdelete/:id', function (req, res, next) {
   
});

module.exports = router;