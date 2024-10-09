const { comparePassword } = require('../helpers/bcrypt')
const {Category, Course, Student, StudentCourse, User} = require('../models')

class Controller {
    static async home(req, res) {
        try {
            let data = await Course.findAll()
            console.log(data, "<<<<<<<<<<<<<<");
            res.render('index', {data})
        } catch (error) {
            res.send(error)
        }
    }
    static async studentSignIn(req,res) {
        try {
            res.render('signin')
        } catch (error) {
            res.send(error)
        }
    }
    static  async handlerStudentSignIn(req,res) {
        try {
            let {email, password} = req.body
            let data = await User.findOne({where: {
                email: email
            }})
            if (!data) {
                throw 'Invalid e-Mail or password' 
            } 
            if (data.role !== 'student') {
                throw 'Invalid e-Mail or password'
            }
            let checkPassword = comparePassword(password, data.password)
            if(!checkPassword) {
                throw 'Invalid e-Mail or password'
            }
            req.session.userId = data.id  
            req.session.role =  data.role
            res.redirect('/home')
        } catch (error) {
            res.send(error)
        }
    }
    static async instructorSignIn(req,res) {
        try {
            res.render('signin')
        } catch (error) {
            res.send(error)
        }
    }
    static  async handlerinstructorSignIn(req,res) {
        try {
            let {email, password} = req.body
            let data = await User.findOne({where: {
                email: email
            }})
            if (!data) {
                throw 'Invalid e-Mail or password' 
            } 
            if (data.role !== 'instructor') {
                throw 'Invalid e-Mail or password'
            }
            let checkPassword = comparePassword(password, data.password)
            if(!checkPassword) {
                throw 'Invalid e-Mail or password'
            }
            req.session.userId = data.id  
            req.session.role =  data.role
            res.redirect('/home')
        } catch (error) {
            res.send(error)
        }
    }
    static async register(req,res) {
        try {
            res.render('register')
        } catch (error) {
            res.send(error)
        }
    }
    static async handlerRegister(req,res) {
        try {
            let {email, password, name, className} = req.body
            // console.log(req.body, "masooookkkkkkkkk");
            let role = 'student'
            let data = await User.create({email, password, role})
            let dataStudent = await Student.create({name, class: className, UserId: data.id})
            res.redirect('/login')
        } catch (error) {
            res.send(error)
        }
    }
    static async findAllCourse(req,res) {
        try {
            let data = await Course.findAll()
        } catch (error) {
            
        }
    }
}


module.exports = Controller