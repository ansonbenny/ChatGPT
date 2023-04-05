import { Router } from "express";
import sendMail from '../mail/send.js'
import user from "../helpers/user.js";
import fs from 'fs'
import path from 'path'
let router = Router()

router.post('/signup', async (req, res) => {
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

                            html = html.replace('URL', `${process.env.SITE_URL}/signup/pending/${response._id}`)

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

router.get('/checkPending', async (req, res) => {
    const { _id } = req.query
    let response = null
    try {
        response = await user.checkPending(_id)
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

router.put('/signup-finish', async (req, res) => {
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

router.get('/login', async (req, res) => {
    if (req.query?.email && req.query?.pass) {
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
                res.status(200).json({
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

export default router
