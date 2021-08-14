// add middlewares here related to projects

const {get} = require('./projects-model')

const findProject = (req, res, next) => {

    const id = req.body.project_id || req.params.id;

    if (!id) {
        get()
        .then(resolve => {
            req.projectsArray = resolve;
            next();
        })
        .catch(err => {
            res.status(500).json({message: "Unable to retrieve projects array"});
        });
    } else {
        get(id)
        .then(resolve => {
            if (resolve) {
                req.project = resolve;
                req.id = id;
                next();
            } else {
                res.status(404).json({message: "project not found"})
            }

        })
    }
}

const checkBody = (req, res, next) => {

    const {body} = req;

    if (!body.name ||
        !body.description ||
        typeof body.name !== 'string' ||
        typeof body.description !== 'string') {
            res.status(400).json({message: "Post does not meet requirements"})
        } else {
            next();
        }
}

module.exports = {
    findProject,
    checkBody
}