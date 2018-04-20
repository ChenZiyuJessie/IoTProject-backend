var express=require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Member = require('../models/member')

/* GET ALL MEMBERS */
router.get('/', function (req, res, next) {
    Member.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

/* GET SINGLE MEMBER BY ID */
router.get('/:id', function (req, res, next) {
    Member.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE MEMBER */
router.post('/', function (req, res, next) {
    Member.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE MEMBER */
router.put('/:id', function (req, res, next) {
    Member.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE MEMBER */
router.delete('/:id', function (req, res, next) {
    Member.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;