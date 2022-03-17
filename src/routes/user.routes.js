const user = require ("../controllers/user.controller");

var routes = require("express").Router();

const userValidator = require('../validators/user.validate');
const validate = require('../middlewares/validate.middleware');
const verifyJwt = require('../middlewares/verifyJwt.middleware');

routes.post('/login',validate(userValidator.loginSchema),user.login);
routes.post('/',user.create);
routes.get('/',verifyJwt(),user.findAll);

module.exports = routes;
