// Write your "actions" router here!

const express = require('express');

const router = express.Router();

router.get('*', (req, res) => {
    res.status(200).json({message: 'actions router working'})
})

module.exports = router;
