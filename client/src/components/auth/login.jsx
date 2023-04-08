import React, { useReducer, useState } from 'react'
import { GptIcon, Google, Microsoft } from '../../assets'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import FormFeild from './FormFeild'
import './style.scss'

const reducer = (state, { type, status }) => {
    switch (type) {
        case 'filled':
            return { filled: status }
        case 'error':
            return { error: status, filled: state.filled }
        default: return state
    }
}

const LoginComponent = () => {
    const [state, dispatch] = useReducer(reducer, {
        filled: false,
        error: false
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

    const formHandle = async (e) => {
        e.preventDefault()
        let res = null
        try {
            res = await axios.get('/api/user/login', {
                withCredentials: true,
                params: formData
            })
        } catch (err) {
            console.log(err)
            if (err?.response?.data?.status === 422) {
                dispatch({ type: 'error', status: true })
            }
        } finally {
            if (res?.data) {
                dispatch({ type: 'error', status: false })
                console.log(res?.data)
            }
        }
    }

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
                                    name={'email'}
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
                    <form className='Form' onSubmit={formHandle}>
                        <div>
                            <div className="email">
                                <button type='button' onClick={() => {
                                    dispatch({ type: 'filled', status: false })
                                }} >Edit</button>

                                <FormFeild
                                    value={formData.email}
                                    name={'email'}
                                    type={"email"}
                                    isDisabled />

                            </div>

                            <div className="password">

                                <FormFeild
                                    value={formData.pass}
                                    name={'pass'}
                                    label={"Password"}
                                    type={"password"}
                                    handleInput={handleInput}
                                    error={state?.error}
                                />

                            </div>

                            <div>
                                {state?.error && <div className='error'><div>!</div> Email or password wrong.</div>}
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

