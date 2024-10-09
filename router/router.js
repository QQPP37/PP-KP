const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

// define the about route
router.get('/', Controller.home)
router.get('/signin', Controller.studentSignIn)
router.post('/signin', Controller.handlerStudentSignIn)
router.get('/register', Controller.register)
router.post('/register', Controller.handlerRegister)
router.get('/instructor', Controller.instructorSignIn)
router.post('/instructor', Controller.handlerinstructorSignIn)
router.use((req,res,next)=> {
    if (!req.session.UserId) {
        const error = 'Sign-In to Continue'
        // console.log('apa aja deh');
        res.redirect(`/?errors=${error}`)
    } else {
        // console.log('YOYOYYYYYYY')
        next()
    }
})
router.get('/home', Controller.showAllStudentCourse)
router.get('/course/add', Controller.selectAllCourse)
router.get('/course/add/:id', Controller.handlerSelectAllCourse)
router.get('/course/delete/:id', Controller.deleteStudentCourse)
router.get('/instructor/home', Controller.getAllCoursesInstructor)
router.get('/instructor/course/add', Controller.addCourseInstructor)
router.post('/instructor/course/add', Controller.handlerAddCourseInstructor)
router.get('/instructor/course/edit/:id', Controller.editCoursesInstructor)
router.post('/instructor/course/edit/:id', Controller.handlerEditCourseInstructor)
router.get('logout', Controller.logOut)


module.exports = router