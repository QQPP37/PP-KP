// const { where } = require('sequelize')
const { comparePassword } = require('../helpers/bcrypt')
const { sendEmail } = require('../helpers/nodemailer')
const { Category, Course, Student, StudentCourse, User } = require('../models')

class Controller {
    static async home(req, res) {
        try {
            let data = await Course.findAll()
            // console.log(data, "<<<<<<<<<<<<<<");
            res.render('index', { data })
        } catch (error) {
            res.send(error)
        }
    }
    static async studentSignIn(req, res) {
        try {
            res.render('login')
        } catch (error) {
            res.send(error)
        }
    }
    static async handlerStudentSignIn(req, res) {
        try {
            let { email, password } = req.body
            // console.log(req.body);
            let data = await User.findOne({
                where: {
                    email: email
                }
            })
            console.log(data);

            if (!data) {
                throw 'Invalid e-Mail or password'
            }
            if (data.role !== 'student') {
                throw 'Invalid e-Mail or password'
            }
            let checkPassword = comparePassword(password, data.password)
            // console.log(checkPassword, "pass eneeeeh");

            if (!checkPassword) {
                throw 'Invalid e-Mail or password'
            }
            let data2 = await Student.findOne({
                where: {
                    UserId: data.id
                }
            })
            req.session.UserId = data2.id
            req.session.role = data.role
            // console.log(req.session, "ininih datanya");

            res.redirect('/home')
        } catch (error) {
            res.send(error)
        }
    }
    static async instructorSignIn(req, res) {
        try {
            res.render('instructorlogin')
        } catch (error) {
            res.send(error)
        }
    }
    static async handlerinstructorSignIn(req, res) {
        try {
            let { email, password } = req.body
            let data = await User.findOne({
                where: {
                    email: email
                }
            })
            console.log(data, "yang bener aje?");
            
            if (!data) {
                throw 'Invalid e-Mail or password'
            }
            if (data.role !== 'instructor') {
                throw 'Invalid e-Mail or password'
            }
            let checkPassword = comparePassword(password, data.password)
            if (!checkPassword) {
                throw 'Invalid e-Mail or password'
            }
            req.session.UserId = data.id
            req.session.role = data.role
            res.redirect('/instructor/home')   
        } catch (error) {
            res.send(error)
        }
    }
    static async register(req, res) {
        try {
            let { errors } = req.query
            res.render('register', { errors })
        } catch (error) {
            res.send(error)
        }
    }
    static async handlerRegister(req, res) {
        try {
            let { email, password, name, className } = req.body
            // console.log(req.body, "masooookkkkkkkkk");
            let role = 'student'
            let data = await User.create({ email, password, role })
            let dataStudent = await Student.create({ name, class: className, UserId: data.id })
            sendEmail(data.email, dataStudent.name)
            res.redirect('/login')
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeConstraintError') {
                error = error.errors.map(el => {
                    return el.message
                })
                res.redirect(`/register?errors=${error}`)
            }
            res.send(error)
        }
    }
    static async selectAllCourse(req, res) {
        try {
            if (req.session.role !== 'student') {
                res.redirect('/instructor/home')
            }
            let data = await Course.findAll()
            res.render('allCourses', { data })
        } catch (error) {
            res.send(error)
        }
    }
    static async handlerSelectAllCourse(req, res) {
        try {
            let { id } = req.params
            let data = await StudentCourse.create({ CourseId: id, StudentId: req.session.UserId })
            console.log(data, id, req.session.UserId, "anjaayyyy ada");
            
            res.redirect('/home')
        } catch (error) {
            res.send(error)
        }
    }
    static async showAllStudentCourse(req, res) {
        try {
            if (req.session.role !== 'student') {
                res.redirect('/instructor/home')
            }
            // console.log(req.session.UserId,'ininih');
            let data = await Student.findAll({
                include: {
                    model: Course
                }, where: {
                    id: req.session.UserId
                }
            })
            console.log(data[0].Courses.length, "MASOOOOOOOOOOK INI BEDA TAPI", req.session.UserId);
            res.render('detailstudentcourse', { data })
        } catch (error) {
            res.send(error)
        }
    }
    static async deleteStudentCourse(req, res) {
        try {
            if (req.session.role !== 'student') {
                throw error
            }
            let { id } = req.params
            let data = await StudentCourse.destroy({
                where: {
                    id
                }
            })
            res.redirect('/home')
        } catch (error) {
            res.send(error)
        }
    }
    static async getAllCoursesInstructor(req, res) {
        try {
            if (req.session.role !== 'instructor') {
                res.redirect('/home')
            }
            let data = await Course.findAll()
            // console.log(data, "plisla woyyy");
            
            res.render('homeTeacher', {data})
        } catch (error) {
            res.send(error)
        }
    }
    static async addCourseInstructor(req, res) {
        try {
            if (req.session.role !== 'instructor') {
                res.redirect('/home')
            }
            let data = await Course.findAll({ include: Category })
<<<<<<< HEAD
            let data2 = await Category.findAll()
            console.log(data,data2,'lllllllllllllllllllllllll');
            
            res.render('addcourseinstructor', { data, data2 })
=======
            res.render('addCoursesByTeacher', { data })
>>>>>>> a7f84fd3da48b0cf1223e574c1b09bae5952dd0a
        } catch (error) {
            res.send(error)
        }
    }
    static async handlerAddCourseInstructor(req, res) {
        try {
            let { name, duration, CategoryId, description } = req.body
            await Course.create({ name, duration, CategoryId, description })
            res.redirect('/instructor/home')
        } catch (error) {
            res.send(error)
        }
    }
    static async editCoursesInstructor(req, res) {
        try {
            if (req.session.role !== 'instructor') {
                res.redirect('/home')
            }
            console.log('MaSOOOOkkkk');
            
            let { id } = req.params
            console.log(id, "INI ID WOY");
            
            let data = await Course.findByPk(id)
            let data2 = await Category.findAll()
            console.log(data, data2, "KIIINNGG KACAWWWWW");
            
            res.render('editcourseinstructor', { data, data2 })
        } catch (error) {
            res.send(error)
        }
    }
    static async deleteCoursesInstructor(req,res) {
        try {
            let {id} = req.params
            console.log(req.params, "param ini bang");
            let courseData = await StudentCourse.destroy({where: {
                CourseId: id
            }})
            let data = await Course.destroy({where: {
                id: id
            }})
            console.log(data, "bisalah woyyyy");
            
            res.redirect('/instructor/home')
        } catch (error) {
            res.send(error)
        }
    }
    static async handlerEditCourseInstructor(req, res) {
        try {
            let { name, duration, CategoryId, description } = req.body
            let data = await Course.update({ name, duration, CategoryId, description })
            res.redirect('/instructor/home')
        } catch (error) {
            res.send(error)
        }
    }
    static async logOut(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) {
                    res.send(err)
                }
                else {
                    res.redirect('/')
                }
            })
        } catch (error) {
            res.send(error)
        }
    }
}


module.exports = Controller