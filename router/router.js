const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

// define the about route
router.get('/', Controller.home)
// router.get('/signin', Controller.signIn)
// router.post('/signin', Controller.handlerSignIn)
router.get('/register', Controller.register)
router.post('/register', Controller.handlerRegister)

module.exports = router