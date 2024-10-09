const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

// define the about route
router.get('/', Controller.home)
router.get('/signin', Controller.studentSignIn)
router.post('/signin', Controller.handlerStudentSignIn)
router.get('/register', Controller.register)
router.post('/register', Controller.handlerRegister)
router.get('/home', Controller.showAllStudentCourse)

module.exports = router