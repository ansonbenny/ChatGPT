import { Router } from "express";
import sendMail from '../mail/send.js'
import user from "../helpers/user.js";
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
let router = Router()

const CheckLogged = async (req, res, next) => {
    jwt.verify(req.cookies?.token, process.env.JWT_PRIVATE_KEY, async (err, decoded) => {
        if (decoded) {
            let userData = await user.checkUserFound(decoded).catch((err) => {
                res.status(500).json({
                    status: 500,
                    message: err
                })
            })

            if (userData) {
                res.status(208).json({
                    status: 208,
                    message: 'Already Logged'
                })
            } else {
                next()
            }

        } else {
            next()
        }
    })
}

router.post('/signup', CheckLogged, async (req, res) => {
    if (req.body?.email) {
        if (req.body?.pass.length >= 8) {
            req.body.pending = true
            req.body.email = req.body.email.toLowerCase()
            let response = null

            try {
                response = await user.signup(req.body)
            } catch (err) {
                if (err?.exists) {
                    res.status(400).json({
                        status: 400,
                        message: err
                    })
                } else {
                    res.status(500).json({
                        status: 500,
                        message: err
                    })
                }
            } finally {
                if (response?.manual) {
                    fs.readFile(`${path.resolve(path.dirname(''))}/mail/template.html`, 'utf8', (err, html) => {
                        if (!err) {

                            html = html.replace('[URL]', `${process.env.SITE_URL}/signup/pending/${response._id}`)
                            html = html.replace('[TITLE]', 'Verify your email address')
                            html = html.replace('[CONTENT]', 'To continue setting up your OpenAI account, please verify that this is your email address.')
                            html = html.replace('[BTN_NAME]', 'Verify email address')

                            sendMail({
                                to: req.body.email,
                                subject: `OpenAI - Verify your email`,
                                html
                            })

                        } else {
                            console.log(err)
                        }
                    })

                    res.status(200).json({
                        status: 200,
                        message: 'Success',
                        data: {
                            _id: response.manual && response._id || null,
                            manual: response.manual || false
                        }
                    })
                } else if (response) {
                    res.status(200).json({
                        status: 200,
                        message: 'Success',
                        data: {
                            _id: response.manual && response._id || null,
                            manual: response.manual || false
                        }
                    })
                }
            }
        } else {
            res.status(422).json({
                status: 422,
                message: 'Password must 8 character'
            })
        }
    } else {
        res.status(422).json({
            status: 422,
            message: 'Enter email'
        })
    }
})

router.get('/checkPending', CheckLogged, async (req, res) => {
    const { _id } = req.query
    let response = null
    if (_id?.length === 24) {
        try {
            response = await user.checkPending(_id)
        } catch (err) {
            if (err?.status === 422) {
                res.status(422).json({
                    status: 422,
                    message: err?.text
                })
            } else if (err?.status === 404) {
                res.status(404).json({
                    status: 404,
                    message: err?.text
                })
            } else {
                res.status(500).json({
                    status: 500,
                    message: err
                })
            }
        } finally {
            if (response) {
                res.status(200).json({
                    status: 200,
                    message: 'Success',
                    data: response
                })
            }
        }
    } else {
        res.status(404).json({
            status: 404,
            message: 'Not found'
        })
    }
})

router.put('/signup-finish', CheckLogged, async (req, res) => {
    let response = null
    try {
        response = await user.finishSignup(req.body)
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err
        })
    } finally {
        if (response) {
            res.status(200).json({
                status: 200,
                message: 'Success',
                data: response
            })
        }
    }
})

router.get('/login', CheckLogged, async (req, res) => {
    if (req.query?.email && req.query?.pass) {
        req.query.email = req.query.email.toLowerCase()
        let response = null
        try {
            response = await user.login(req.query)
        } catch (err) {
            if (err?.status === 422) {
                res.status(422).json({
                    status: 422,
                    message: 'Email or password wrong'
                })
            } else {
                res.status(500).json({
                    status: 500,
                    message: err
                })
            }
        } finally {
            if (response) {
                let token = jwt.sign({
                    _id: response._id,
                    email: response.email
                }, process.env.JWT_PRIVATE_KEY, {
                    expiresIn: '15m'
                })

                res.status(200)
                    .cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 900000) })
                    .json({
                        status: 200,
                        message: 'Success',
                        data: response
                    })
            }
        }
    } else {
        res.status(422).json({
            status: 422,
            message: 'Email or password wrong'
        })
    }
})

router.post('/forgot-request', CheckLogged, async (req, res) => {
    if (req.body?.email) {
        let secret = Math.random().toString(16)
        secret = secret.replace('0.', '')
        let response = null
        try {
            response = await user.forgotRequest(req.body, secret)
        } catch (err) {
            if (err?.status === 422) {
                res.status(422).json({
                    status: 422,
                    message: 'Email wrong'
                })
            } else {
                res.status(500).json({
                    status: 500,
                    message: err
                })
            }
        } finally {
            if (response) {
                fs.readFile(`${path.resolve(path.dirname(''))}/mail/template.html`, 'utf8', (err, html) => {
                    if (!err) {

                        html = html.replace('[URL]', `${process.env.SITE_URL}/forgot/set/${response._id}/${response.secret}`)
                        html = html.replace('[TITLE]', 'Reset password')
                        html = html.replace('[CONTENT]', 'A password change has been requested for your account. If this was you, please use the link below to reset your password.')
                        html = html.replace('[BTN_NAME]', 'Reset password')

                        sendMail({
                            to: req.body.email,
                            subject: `Change password for OpenAI`,
                            html
                        })

                    } else {
                        console.log(err)
                    }
                })

                res.status(200).json({
                    status: 200,
                    message: 'Success'
                })
            }
        }
    } else {
        res.status(422).json({
            status: 422,
            message: 'Email wrong'
        })
    }
})

router.get('/forgot-check', CheckLogged, async (req, res) => {
    if (req.query?.userId && req.query?.secret) {
        let response = null
        try {
            response = await user.checkForgot(req.query)
        } catch (err) {
            if (err?.status === 404) {
                res.status(404).json({
                    status: 404,
                    message: 'Wrong Verification'
                })
            } else {
                res.status(500).json({
                    status: 500,
                    message: err
                })
            }
        } finally {
            if (response) {
                res.status(200).json({
                    status: 200,
                    message: 'Success'
                })
            }
        }
    } else {
        res.status(404).json({
            status: 404,
            message: 'Wrong Verification'
        })
    }
})

router.put('/forgot-finish', CheckLogged, async (req, res) => {
    if (req.body?.userId && req.body?.secret) {

        if (req.body?.newPass?.length >= 8 && req.body?.reEnter
            && req.body?.newPass === req.body?.reEnter) {

            let response = null
            try {
                response = await user.resetPassword(req.body)
            } catch (err) {
                if (err?.status === 404) {
                    res.status(404).json({
                        status: 404,
                        message: 'Wrong Verification'
                    })
                } else {
                    res.status(500).json({
                        status: 500,
                        message: err
                    })
                }
            } finally {
                if (response) {
                    res.status(200).json({
                        status: 200,
                        message: "Success"
                    })
                }
            }
        } else {
            res.status(422).json({
                status: 422,
                message: 'Password must 8 character and New password and Re Enter password must same'
            })
        }
    } else {
        res.status(404).json({
            status: 404,
            message: 'Wrong Verification'
        })
    }
})

router.get('/checkUserLogged', CheckLogged, (req, res) => {
    res.status(405).json({
        status: 405,
        message: 'Not Logged User'
    })
})

router.get('/logout', (req, res) => {

})

export default router
