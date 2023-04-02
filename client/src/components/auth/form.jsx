import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeHide, Tick } from '../../assets'

const Form = ({ inputRef, labelRef, state, dispatch, isSignup, isForgot }) => {

    const navigate = useNavigate()

    return (
        <form className='Form'>
            <div>
                {
                    !isForgot ? (
                        <div className="email">
                            <button type='button' onClick={() => {
                                dispatch({ type: 'filled', status: false })
                            }} >Edit</button>
                            <input value={'ansonbenny@gmail.com'} type="text" disabled readOnly />
                        </div>
                    ) : (
                        <div className="emailForgot">
                            <label ref={labelRef}>Email address</label>
                            <input ref={inputRef} type="email" onFocus={() => {
                                labelRef.current?.classList.add("active-label", "active-label-green")
                                inputRef.current?.classList.add("active-input", "active-input-green")
                            }} onBlur={() => {
                                if (inputRef.current?.value.length <= 0) {
                                    labelRef.current?.classList.remove("active-label", "active-label-green")
                                    inputRef.current?.classList.remove("active-input", "active-input-green")
                                } else {
                                    labelRef.current?.classList.remove("active-label-green")
                                    inputRef.current?.classList.remove("active-input-green")
                                }
                            }} required />
                        </div>
                    )
                }

                {
                    !isForgot && (
                        <>
                            <div className="password">
                                <label ref={labelRef}>Password</label>
                                <input ref={inputRef} type="password" onFocus={() => {
                                    labelRef.current?.classList.add("active-label", "active-label-green")
                                    inputRef.current?.classList.add("active-input", "active-input-green")
                                }} onBlur={() => {
                                    if (inputRef.current?.value.length <= 0) {
                                        labelRef.current?.classList.remove("active-label", "active-label-green")
                                        inputRef.current?.classList.remove("active-input", "active-input-green")
                                    } else {
                                        labelRef.current?.classList.remove("active-label-green")
                                        inputRef.current?.classList.remove("active-input-green")
                                    }
                                }} onInput={(e) => {

                                    document.querySelector('#alertBox').style.display = "block"

                                    if (e.target.value.length >= 8) {
                                        document.querySelector('#passAlertError').classList?.remove('active')
                                        document.querySelector('#passAlertDone').classList?.add('active')
                                    } else {
                                        document.querySelector('#passAlertDone').classList?.remove('active')
                                        document.querySelector('#passAlertError').classList?.add('active')
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
                        </>
                    )
                }

                {
                    !isSignup && !isForgot && <div className='forgot' >
                        <Link to={'/forgot'} >Forgot password?</Link>
                    </div>
                }

                <button type='submit'>Continue</button>

                {
                    isForgot && <div>
                        <button type='button' onClick={() => {
                            navigate('/login/auth')
                        }} className='back'>Back to Apps Client</button>
                    </div>
                }

            </div>

            {
                !isForgot && <div data-for="acc-sign-up-login">

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
            }
        </form>
    )
}

export default Form
