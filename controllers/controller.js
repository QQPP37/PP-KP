// const { where } = require('sequelize')
const { comparePassword } = require('../helpers/bcrypt')
const {Category, Course, Student, StudentCourse, User} = require('../models')

class Controller {
    static async home(req, res) {
        try {
            let data = await Course.findAll()
            // console.log(data, "<<<<<<<<<<<<<<");
            res.render('index', {data})
        } catch (error) {
            res.send(error)
        }
    }
    static async studentSignIn(req,res) {
        try {
            res.render('login')
        } catch (error) {
            res.send(error)
        }
    }
    static  async handlerStudentSignIn(req,res) {
        try {
            let {email, password} = req.body
            console.log(req.body);

            
            let data = await User.findOne({where: {
                email: email
            }})
            console.log(data);
            
            if (!data) {
                throw 'Invalid e-Mail or password' 
            } 
            if (data.role !== 'student') {
                throw 'Invalid e-Mail or password'
            }
            let checkPassword = comparePassword(password, data.password)
            console.log(checkPassword, "pass jing");
            
            if(!checkPassword) {
                throw 'Invalid e-Mail or password'
            }
            let data2 = await Student.findOne({where:{
                UserId: data.id
            }})
            req.session.UserId = data2.id  
            req.session.role =  data.role
            console.log(req.session, "ininih datanya");
            
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
            let {errors} = req.query
            res.render('register', {errors})
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
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeConstraintError') {
                error = error.errors.map(el=> {
                    return el.message
                })
                res.redirect(`/register?errors=${error}`)
            }
            res.send(error)
        }
    }
    static async selectAllCourse(req,res) {
        try {
            let data = await Course.findAll()
            res.render('selectcourse', {data})
        } catch (error) {
            res.send(error)
        }
    }
    static async handlerSelectAllCourse(req,res) {
        try {
            let {id} = req.params
            let data = await StudentCourse.create({CourseId: id, StudentId: req.session.UserId})
            res.redirect('/home')
        } catch (error) {
            res.send(error)
        }
    }
    static async showAllStudentCourse(req,res) {
        try {
            // console.log(req.session.UserId,'ininih');
            let data = await Student.findAll({include: Course, where: {
                id: req.session.UserId
            }})
            // console.log(data[0].Courses, "MASOOOOOOOOOOK");
            res.render('detailstudentcourse', {data})
        } catch (error) {
            res.send(error)
        }
    }
    static async deleteStudentCourse(req,res) {
        try {
            if (req.session.role !== 'student') {
                throw error
            }
            let {id} = req.params
            let data = await StudentCourse.destroy({where: {
                id
            }})
            res.redirect('/home')
        } catch (error) {
            res.send(error)
        }
    }

}


module.exports = Controller