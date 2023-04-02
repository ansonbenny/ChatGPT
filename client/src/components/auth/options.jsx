import React from 'react'
import { Link } from 'react-router-dom'
import { Google, Microsoft } from '../../assets'

const Options = ({ inputRef, labelRef, isSignup, dispatch }) => {
    return (
        <div className='options'>
            <form className="manual" onSubmit={(e) => {
                e.preventDefault()
                dispatch({ type: 'filled', status: true })
            }}>
                <div>
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

                    }} required
                    />
                </div>
                <div>
                    <button type='submit' >Continue</button>
                </div>
            </form>

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
    )
}

export default Options
