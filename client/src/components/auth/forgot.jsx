import React, { Fragment, useCallback, useReducer, useState } from 'react'
import { GptIcon, Tick, Mail } from '../../assets'
import { useNavigate } from 'react-router-dom'
import FormFeild from './FormFeild'
import instance from '../../config/instance'
import './style.scss'

const reducer = (state, { type, status }) => {
    switch (type) {
        case 'mail':
            return { mail: status }
        case 'error':
            return { error: status }
        default: return state
    }
}

const ForgotComponent = ({ isRequest, userId, secret }) => {
    const [state, stateAction] = useReducer(reducer, {
        mail: false
    })

    const navigate = useNavigate()

    const passwordClass = useCallback((remove, add) => {
        document.querySelector(remove).classList?.remove('active')
        document.querySelector(add).classList?.add('active')
    }, [])

    const [formData, setFormData] = useState({
        email: '',
        newPass: '',
        reEnter: ''
    })

    const handleInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const formHandleMail = async (e) => {
        if (e) { e.preventDefault() }
        let res = null
        try {
            res = await instance.post('/api/user/forgot-request', {
                email: formData.email
            })
        } catch (err) {
            console.log(err)
            if (err?.response?.data?.status === 422) {
                stateAction({ type: 'error', status: true })
            }
        } finally {
            if (res?.data?.status === 208) {
                navigate('/')
            } else if (res) {
                stateAction({ type: 'mail', status: true })
            }
        }
    }

    const formHandleReset = async (e) => {
        e.preventDefault()
        if (userId && secret && formData?.newPass.length >= 8) {
            if (formData?.newPass === formData?.reEnter) {
                stateAction({ type: 'error', status: false })

                let res = null
                try {
                    res = await instance.put('/api/user/forgot-finish', {
                        userId,
                        secret,
                        newPass: formData.newPass,
                        reEnter: formData.reEnter
                    })
                } catch (err) {
                    console.log(err)
                    alert(err)
                    navigate('/forgot')
                } finally {
                    if (res) {
                        navigate('/login')
                    }
                }
            } else {
                stateAction({ type: 'error', status: true })
            }
        }
    }

    return (
        <div className='Contain'>
            <div className='icon'>
                <GptIcon />
            </div>

            {
                isRequest ? (
                    <Fragment>
                        {
                            !state.mail ? (
                                <Fragment>
                                    <div>
                                        <h1>Reset your password</h1>

                                        <p>Enter your email address and we will send you instructions to reset your password.</p>
                                    </div>

                                    <form className='Form' onSubmit={formHandleMail}>
                                        <div>
                                            <div className="emailForgot">

                                                <FormFeild
                                                    value={formData.email}
                                                    name={'email'}
                                                    label={"Email address"}
                                                    type={"email"}
                                                    handleInput={handleInput}
                                                    error={state?.error}
                                                />

                                                {state?.error && <div className='error'><div>!</div> The user not exists.</div>}
                                            </div>

                                            <button type='submit'>Continue</button>

                                            <div>
                                                <button type='button' onClick={() => {
                                                    navigate('/login/auth')
                                                }} className='back'>Back to Apps Client</button>
                                            </div>
                                        </div>
                                    </form>
                                </Fragment>
                            )
                                : (
                                    <div className='mail'>
                                        <div className='icon'>
                                            <Mail />
                                        </div>

                                        <div>
                                            <h3>Check Your Email</h3>
                                        </div>

                                        <div>
                                            <p>Please check the email address {formData?.email} for instructions to reset your password.</p>
                                        </div>

                                        <button onClick={() => formHandleMail(null)}>Resend Mail</button>
                                    </div >
                                )
                        }
                    </Fragment>
                ) : (
                    <Fragment>
                        <div>
                            <h1>Enter your password</h1>
                            <p>Enter a new password below to change your password.</p>
                        </div>
                        <form className='Form' onSubmit={formHandleReset}>
                            <div>
                                <div className="password">

                                    <FormFeild
                                        value={formData.newPass}
                                        name={'newPass'}
                                        label={"New password"}
                                        type={"password"}
                                        handleInput={handleInput}
                                        passwordClass={passwordClass}
                                        error={state?.error}
                                    />

                                </div>

                                <div className="password">

                                    <FormFeild
                                        value={formData.reEnter}
                                        name={'reEnter'}
                                        label={"Re-enter new password"}
                                        type={"password"}
                                        handleInput={handleInput}
                                        error={state?.error}
                                    />

                                </div>

                                {state?.error && <div className='error'><div>!</div> Password not match.</div>}

                                <div id='alertBox'>
                                    Your password must contain:

                                    <p id='passAlertError' className='active'>
                                        <span>&#x2022;</span>
                                        &nbsp;
                                        At least 8 characters
                                    </p>

                                    <p id='passAlertDone' className='active'>
                                        <span><Tick /></span>
                                        &nbsp;
                                        At least 8 characters
                                    </p>
                                </div>

                                <button type='submit'>Reset password</button>
                            </div>
                        </form>
                    </Fragment>
                )
            }

        </div >
    )
}

export default ForgotComponent
