const { comparePassword } = require('../helpers/bcrypt')
const {Category, Course, Student, StudentCourse, User} = require('../models')

class Controller {
    static async home(req, res) {
        try {
            res.render('home')
        } catch (error) {
            res.send(error)
        }
    }
    static async signIn(req,res) {
        try {
            res.render('signin')
        } catch (error) {
            res.send(error)
        }
    }
    static  async handlerSignIn(req,res) {
        try {
            let {email, password} = req.body
            let data = await User.findOne({where: {
                email: email
            }})
            if (!data) {
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
            let {email, password, role} = req.body
            console.log(req.body, "masooookkkkkkkkk");
            
            let data = await User.create({email, password, role})
            res.redirect('/login')
        } catch (error) {
            res.send(error)
        }
    }
    static async 
}


module.exports = Controller