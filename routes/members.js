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


});
/*GET SINGLE MEMBER BY ID */
router.get('./member/:id', function (req, res, next) {

})

/*UPDATE MEMBER*/
router.put('./member/:id', function (req, res, next) {

})

/*DELETE MEMBER */
router.delete('/:id', function (req, res, next) {

})


module.exports = router;