const db = require("../models");
const User = db.user;
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const privateKey = config.get('jwt.private-key');
const tokenExpireInSeconds = config.get('jwt.expiry')
// Create and Save a new Tutorial
exports.create = (req, res) => {
    const user = {
        email: 'example@gmail.com',
        password: 'verystrongpassword',
        role: 'user'
      };
      // Save User in the database
      User.create(user)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          // Returning an error
          
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        });
};
// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.login = async (req,res) => {
  try {
    const user = await User.findOne({where: {email: req.body.email} });
    if (!user) {
      res.status(401).send({
        success: false,
        message: 'Authentication failed'
      });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      res.status(401).send({
        success: false,
        message: 'Authentication failed'
      });
    }
    
    const { password: _, ...payload } = user.toJSON()
    const token = jwt.sign(payload, privateKey, {
      expiresIn: tokenExpireInSeconds
    });
    res.json({
      success: true,
      message: 'Token created.',
      token: token
    });
  } catch (error) {
    return { success: false, error: error.message }
  }

}
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};