import React, { Fragment, useCallback, useReducer, useRef, useState } from 'react'
import { GptIcon, Eye, EyeHide, Tick, Mail } from '../../assets'
import { Link, useNavigate } from 'react-router-dom'
import FormFeild from './FormFeild'
import './style.scss'

const reducer = (state, { type, status }) => {
    switch (type) {
        case 'filled':
            return { filled: status }
        case 'showPass':
            return { showPass: status, filled: state.filled }
        default: return state
    }
}

const ForgotComponent = () => {
    const [state, dispatch] = useReducer(reducer, {
        filled: false
    })

    const [formData, setFormData] = useState({
        email: '',
        pass: ''
    })

    const handleInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const formHandle = () => {

    }

    const labelRef = useRef()
    const inputRef = useRef()

    const navigate = useNavigate()

    const inputClass = useCallback((add, label, input) => {
        if (add) {
            labelRef.current?.classList.add(...label)
            inputRef.current?.classList.add(...input)
        } else {
            labelRef.current?.classList.remove(...label)
            inputRef.current?.classList.remove(...input)
        }
    }, [])

    const passwordClass = useCallback((remove, add) => {
        document.querySelector(remove).classList?.remove('active')
        document.querySelector(add).classList?.add('active')
    }, [])

    return (
        <div className='Contain'>
            <div className='icon'>
                <GptIcon />
            </div>

            {
                !state.mail ? (
                    <Fragment>
                        <div>
                            <h1>Reset your password</h1>

                            <p>Enter your email address and we will send you instructions to reset your password.</p>
                        </div>

                        <form className='Form'>
                            <div>
                                <div className="emailForgot">

                                    <FormFeild
                                        value={formData.email}
                                        inputRef={inputRef}
                                        labelRef={labelRef}
                                        name={'email'}
                                        inputClass={inputClass}
                                        label={"Email address"}
                                        type={"email"}
                                        handleInput={handleInput}
                                    />

                                    <div className='error'><div>!</div> The user already exists.</div>
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
                                <p>Please check the email address ansonbenny14@gmail.com for instructions to reset your password.</p>
                            </div>

                            <button>Resend Mail</button>
                        </div >
                    )
            }

        </div >
    )
}

export default ForgotComponent
