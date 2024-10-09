const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

// define the about route
router.get('/', Controller.home)
router.get('/signin', Controller.studentSignIn)
router.post('/signin', Controller.handlerStudentSignIn)
router.get('/register', Controller.register)
router.post('/register', Controller.handlerRegister)
router.use((req,res,next)=> {
    if (!req.session.UserId) {
        const error = 'Sign-In to Continue'
        console.log('apa aja deh');
        
        res.redirect(`/?errors=${error}`)
    } else {
        console.log('YOYOYYYYYYY')
        
        next()
    }
})
router.get('/home', Controller.showAllStudentCourse)
router.get('/course/add', Controller.selectAllCourse)
router.post('/course/add', Controller.handlerSelectAllCourse)

module.exports = router