/**
 * Module Dependencies
 */
const errors = require('restify-errors');

/**
 * Model Schema
 */
const Todo = require('../models/todo');

module.exports = function(server){

    /**
     * POST
     */

    server.post('/todos', (req, res, next) => {
        if(!req.is('application/json')){
            return next(
                new errors.InvalidContentError("Expects 'application/json'"),
            );
        }

        let data = req.body || {};

        let todo = new Todo(data);
        todo.save(function(err){
            if(err){
                console.error(err);
                return next(new errors.InternalError(err.message));
                next();
            }

            res.send(201);
            next();
        });
    });
}