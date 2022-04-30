const express = require('express');
const router = express.Router();

router.get('', function (req, res) {
    res.send(405,'Restricted access!!!');
});

router.post('', function (req, res) {
    res.send(405,'Restricted access!!!');
});

router.put('', function (req, res) {
    res.send(405,'Restricted access!!!');
});

router.delete('', function (req, res) {
    res.send(405,'Restricted access!!!');
});

module.exports = router;