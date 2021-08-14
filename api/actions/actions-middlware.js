// add middlewares here related to actions
const {get} = require('./actions-model');

const findActions = (req, res, next) => {

    const {id} = req.params;

    if (!id) {
        get()
        .then(resolve => {
            req.actions = resolve;
            next();
        })
        .catch(err => {
            res.status(500).json({message: "Unable to retrieve actions array"});
        })
    } else {
        get(id)
        .then(resolve => {
            req.actions = resolve;
            if (resolve) {
                next();
            } else {
                res.status(404).json({message: 'Not a valid actions id'})
            }
        })
        .catch(err => {
            res.status(500).json({message: "Unable to retrieve actions array"})
        })
    }

}

module.exports = {
    findActions
}
