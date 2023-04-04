import React, { Fragment, useCallback, useReducer, useRef, useState } from 'react'
import { GptIcon, Eye, EyeHide, Tick, Google, Microsoft } from '../../assets'
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

const LoginComponent = () => {
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

            <div>
                {!state.filled ? <h1>Welcome back</h1>
                    : <h1>Enter your password</h1>}

            </div>

            {
                !state.filled ? (
                    <div className='options'>
                        <form className="manual" onSubmit={(e) => {
                            e.preventDefault()
                            dispatch({ type: 'filled', status: true })
                        }}>
                            <div>

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
                            </div>
                            <div>
                                <button type='submit' >Continue</button>
                            </div>
                        </form>

                        <div data-for="acc-sign-up-login">
                            <span>Don't have an account?</span>
                            <Link to={'/signup'}>Sign up</Link>
                        </div>

                        <div className="extra">
                            <div className="divide">
                                <span>OR</span>
                            </div>

                            <div className="btns">
                                <button><Google /> Continue with Google</button>
                                <button><Microsoft /> Continue with Microsoft Account</button>
                            </div>

                        </div>
                    </div>
                ) : (
                    <form className='Form'>
                        <div>
                            <div className="email">
                                <button type='button' onClick={() => {
                                    dispatch({ type: 'filled', status: false })
                                }} >Edit</button>

                                <FormFeild
                                    value={formData.email}
                                    inputRef={null}
                                    labelRef={null}
                                    name={'email'}
                                    type={"email"}
                                    isDisabled />

                                <div className='error'><div>!</div> The user already exists.</div>
                            </div>

                            <div className="password">

                                <FormFeild
                                    value={formData.pass}
                                    inputRef={inputRef}
                                    labelRef={labelRef}
                                    name={'pass'}
                                    inputClass={inputClass}
                                    label={"Password"}
                                    type={"password"}
                                    passwordClass={passwordClass}
                                    handleInput={handleInput}
                                />

                                {
                                    state.showPass ? <button type='button' onClick={() => {
                                        inputRef.current.type = "password"
                                        dispatch({ type: 'showPass', status: false })
                                    }}>{<EyeHide />}</button>
                                        : <button type='button' onClick={() => {
                                            inputRef.current.type = "text"
                                            dispatch({ type: 'showPass', status: true })
                                        }}><Eye /></button>
                                }

                            </div>

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

                            <button type='submit'>Continue</button>

                            <div className='forgot' >
                                <Link to={'/forgot'} >Forgot password?</Link>
                            </div>
                        </div>
                        <div data-for="acc-sign-up-login">
                            <span>Don't have an account?</span>
                            <Link to={'/signup'}>Sign up</Link>
                        </div>
                    </form>
                )
            }
        </div >
    )
}

export default LoginComponent

