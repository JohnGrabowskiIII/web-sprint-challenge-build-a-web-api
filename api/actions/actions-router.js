// Write your "actions" router here!

const express = require('express');

const {findActions} = require('./actions-middlware');

const router = express.Router();

router.get('/', findActions, (req, res) => {

    const {actions} = req;

    if (actions) {
        res.status(200).json(actions);
    } else {
        res.status(200).json([])
    }

})

router.get('/:id', findActions, (req, res) => {

    const {actions} = req;

    res.status(200).json(actions)

})

router.get('*', (req, res) => {
    res.status(200).json({message: 'actions router working'})
})

module.exports = router;
