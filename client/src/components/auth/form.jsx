import React, { Fragment, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeHide, Tick } from '../../assets'

const Form = ({ inputRef, labelRef, state, dispatch, isSignup, isForgot }) => {

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
        <form className='Form'>

            {
                !isForgot ? (
                    <Fragment>
                        <div>
                            <div className="email">
                                <button type='button' onClick={() => {
                                    dispatch({ type: 'filled', status: false })
                                }} >Edit</button>
                                <input value={'ansonbenny@gmail.com'} type="text" disabled readOnly />

                                <div className='error'><div>!</div> The user already exists.</div>
                            </div>

                            <div className="password">
                                <label className='labelEffect' ref={labelRef}>Password</label>
                                <input className='inputEffect' ref={inputRef} type="password" onFocus={() => {
                                    inputClass(true, ["active-label", "active-label-green"], ["active-input", "active-input-green"])
                                }} onBlur={() => {
                                    if (inputRef.current?.value.length <= 0) {
                                        inputClass(false, ["active-label", "active-label-green"], ["active-input", "active-input-green"])
                                    } else {
                                        inputClass(false, ["active-label-green"], ["active-input-green"])
                                    }
                                }} onInput={(e) => {

                                    document.querySelector('#alertBox').style.display = "block"

                                    if (e.target.value.length >= 8) {
                                        passwordClass('#passAlertError', "#passAlertDone")
                                    } else {
                                        passwordClass("#passAlertDone", "#passAlertError")
                                    }
                                }} required />

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

                            {
                                !isSignup && <div className='forgot' >
                                    <Link to={'/forgot'} >Forgot password?</Link>
                                </div>
                            }
                        </div>
                        <div data-for="acc-sign-up-login">
                            {
                                isSignup ? (
                                    <>
                                        <span>Already have an account?</span>
                                        <Link to={'/login/auth'}>Log in</Link>
                                    </>
                                ) : (
                                    <>
                                        <span>Don't have an account?</span>
                                        <Link to={'/signup'}>Sign up</Link>
                                    </>
                                )
                            }
                        </div>
                    </Fragment>
                ) : (
                    <div>
                        <div className="emailForgot">
                            <label className='labelEffect' ref={labelRef}>Email address</label>
                            <input className='inputEffect' ref={inputRef} type="email" onFocus={() => {
                                inputClass(true, ["active-label", "active-label-green"], ["active-input", "active-input-green"])
                            }} onBlur={() => {
                                if (inputRef.current?.value.length <= 0) {
                                    inputClass(false, ["active-label", "active-label-green"], ["active-input", "active-input-green"])
                                } else {
                                    inputClass(false, ["active-label-green"], ["active-input-green"])
                                }
                            }} required />

                            <div className='error'><div>!</div> The user already exists.</div>
                        </div>

                        <button type='submit'>Continue</button>

                        <div>
                            <button type='button' onClick={() => {
                                navigate('/login/auth')
                            }} className='back'>Back to Apps Client</button>
                        </div>
                    </div>
                )
            }
        </form>
    )
}

export default Form
