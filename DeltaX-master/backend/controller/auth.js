const User = require('../model/user');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const expressJwt = require('express-jwt');

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({email});
        if(user){
            res.status(409).json({
                error: 'Email id taken'
            })
        }
        else{
            let token = jwt.sign({name, email, password}, process.env.SIGNUP_SECRET_KEY, {expiresIn: '10m'});
            
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'rutujayadav17@gmail.com',
                  pass: 'mkihzotxehphikhk'
                }
            });
            var mailOptions = {
                from: 'rutujayadav17@gmail.com',
                to: email,
                subject: 'Account activation link',
                html: `
                    <h1>Please use the following link to activate your account</h1>
                    <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                    <hr/>
                    <p>This email may contain sensitive information</p>
                    <p>${process.env.CLIENT_URL}</p>
                `
              };
              
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  res.status(200).json({
                    message: `Email has been sent to ${email}. Follow the instructions to activate your account`,
                    token    
                  })
                }
              });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Something went wrong!!"
        })
    }
}

exports.accountActivation = (req, res) => {
    const { token } = req.body;

    if(token){
        jwt.verify(token, process.env.SIGNUP_SECRET_KEY, (err, decoded) => {
            if(err){
                res.status(401).json({
                    error: 'Expired link. Signup again'
                })
            }
            let { name, email, password } = jwt.decode(token);
            let user = new User({name, email, password});
            user.save((err, user) => {
                if(err){
                    res.status(400).json({
                        error: 'Error while saving user to database'
                    })
                }
                res.status(200).json({
                    message: 'Signup Success',
                    user
                })
            })
        })
    }
}


exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({email});
        if(user){
            let isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                let token = jwt.sign({_id: user._id}, process.env.SIGNIN_SECRET_KEY, {expiresIn: '7d'})
                const { _id, name, email, role } = user;
                res.status(200).json({
                    token,
                    message: 'Signin Success',
                    user: { _id, name, email, role }
                })
            }   
            else{
                res.status(400).json({
                    error: 'Password or email id does not match'
                })
            }
        }
        else{
            res.status(400).json({
                error: 'User with that email does not exist. Please Signup'
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.requireSign = expressJwt({
    secret: process.env.SIGNIN_SECRET_KEY,
    algorithms: ['HS256']
})

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({_id: user._id, name: user.name}, process.env.RESET_PASSWORD_SECRET_KEY, {expiresIn: '10m'});

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'adityakadam423@gmail.com',
                  pass: 'zplnlsoysztamanh'
                }
            });
            var mailOptions = {
                from: 'adityakadam423@gmail.com',
                to: email,
                subject: 'Reset Password link',
                html: `
                    <h1>Please use the following link to reset your password</h1>
                    <p>${process.env.CLIENT_URL}/auth/reset/password/${token}</p>
                    <hr/>
                    <p>This email may contain sensitive information</p>
                    <p>${process.env.CLIENT_URL}</p>
                `
            };

            let updatedData = await user.updateOne({resetPasswordLink: token})
            if(updatedData){
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        res.status(200).json({
                        message: `Email has been sent to ${email}. Follow the instructions to activate your account`,
                        token    
                        })
                    }
                });
            }
            else{ 
                return res.status(400).json({
                    error: 'Database connection error on user password forgot request'
                });
            }
        }
        else{
            res.status(400).json({
                error: 'User with that email does not exist'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: "Something went wrong!!"
        })
    }
}

exports.resetPassword = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    if(resetPasswordLink){
        jwt.verify(resetPasswordLink, process.env.RESET_PASSWORD_SECRET_KEY, (err, decoded) => {
            if(err){
                res.status(401).json({
                    error: 'Expired link. Try again later'
                })
            }

            const { _id } = jwt.decode(resetPasswordLink);

            User.findById(_id, (err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                        error: 'Something went wrong. Try later'
                    });
                }
                else{
                    let updatedUserData = {
                        password: newPassword,
                        resetPasswordLink: ""
                    }

                    user = _.extend(user, updatedUserData);
                    user.save((err, sucess) => {
                        if (err) {
                            return res.status(400).json({
                                error: 'Error resetting user password'
                            });
                        }
                        res.json({
                            message: `Great! Now you can login with your new password`
                        });
                    })
                }
            });
        })
    }
}

