// add middlewares here related to actions
const {get} = require('./actions-model');

const findActions = (req, res, next) => {

    const id = req.body.project_id || req.params.id;

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

const checkBody = (req, res, next) => {

    const {body} = req;

    const checkId = !body.project_id || typeof body.project_id !== 'number' ? false : true; 

    const checkDescription = !body.description || typeof body.description !== 'string' || body.description.length > 128 ? false : true;

    const checkNotes = !body.notes || typeof body.notes !== 'string' ? false : true;

    if (checkId && checkDescription && checkNotes) {
        next();
    } else {
        res.status(400).json({message: "Post does not meet requirements"})
    }

}

module.exports = {
    findActions,
    checkBody
}
