const jwt = require('jsonwebtoken');
const config = require('config');
const privateKey = config.get('jwt.private-key');
const User = require("../models").user;

const middleware = () => { 
    return (req, res, next) => { 
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, privateKey, function(err, decoded) {
                if (err) 
                {
                    res.status(401).json({ error: 'Failed to authenticate token.' }) 
                } 
                else 
                {
                    User.findByPk(decoded.id)
                    .then(user => {
                        req.currentUser = user;
                        next();
                    })
                    .catch(err =>
                    {
                        console.log(err);
                        res.send(err);
                    });
                }
            });
        } 
        else 
        {
            res.status(401).json({ error: 'No token provided.' }) 
        }
    } 
  } 
  module.exports = middleware;