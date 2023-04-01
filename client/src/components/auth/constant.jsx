import React, { Fragment, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Google, GptIcon, Microsoft } from '../../assets'
import './style.scss'

const Constant = ({ alert, title, isSignup }) => {
    const labelRef = useRef()
    const inputRef = useRef()

    const log = true

    return (
        <div className='Constant'>
            <div className='icon'>
                <GptIcon />
            </div>

            <div>
                {
                    isSignup ? <h1>{title}</h1>
                        : <>
                            {
                                false ? <h1>{title}</h1>
                                    : <h1>Enter your password</h1>
                            }
                        </>
                }

                {
                    isSignup && <p>{alert}</p>
                }

            </div>

            {
                false ? (
                    <div className='options'>
                        <div className="manual">
                            <div>
                                <label ref={labelRef}>Email address</label>
                                <input ref={inputRef} type="text" onFocus={() => {
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
                                }} />
                            </div>
                            <div>
                                <button>Continue</button>
                            </div>
                        </div>

                        <div data-for="acc-sign-up-login">

                            {
                                isSignup ? (
                                    <>
                                        <span>Already have an account?</span>
                                        <Link to={'/login'}>Log in</Link>
                                    </>
                                ) : (
                                    <>
                                        <span>Don't have an account?</span>
                                        <Link to={'/signup'}>Sign up</Link>
                                    </>
                                )
                            }
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
                    <div className='Form'>
                        <div>
                            <div className="email">
                                <button>Edit</button>
                                <input value={'ansonbenny@gmail.com'} type="text" disabled readOnly />
                            </div>
                            <div className="password">
                                <input type="password" />
                                <button>Show</button>
                            </div>
                            {
                                !isSignup && <div className='forgot' >
                                    <Link>Forgot password?</Link>
                                </div>
                            }
                            <button className='submit' >Continue</button>
                        </div>

                        <div data-for="acc-sign-up-login">

                            {
                                isSignup ? (
                                    <>
                                        <span>Already have an account?</span>
                                        <Link to={'/login'}>Log in</Link>
                                    </>
                                ) : (
                                    <>
                                        <span>Don't have an account?</span>
                                        <Link to={'/signup'}>Sign up</Link>
                                    </>
                                )
                            }
                        </div>
                    </div>
                )
            }


        </div>
    )
}

export default Constant
