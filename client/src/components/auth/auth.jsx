import React, { useReducer, useRef } from 'react'
import { GptIcon, Mail } from '../../assets'
import Form from './form'
import Options from './options'
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

const Auth = ({ alert, title, isSignup, isForgot }) => {

    const [state, dispatch] = useReducer(reducer, {
        filled: false,

    })

    const labelRef = useRef()
    const inputRef = useRef()

    const mail = false

    return (
        <div className='Contain'>
            <div className='icon'>
                <GptIcon />
            </div>

            {
                !mail ? (
                    <>
                        <div>
                            {
                                state.filled ? <h1>{title}</h1>
                                    : <h1>Enter your password</h1>
                            }

                            {
                                alert && <p>{alert}</p>
                            }

                        </div>

                        {
                            !state.filled && !isForgot ? (
                                <Options
                                    inputRef={inputRef}
                                    labelRef={labelRef}
                                    isSignup={isSignup}
                                    dispatch={dispatch}
                                />
                            ) : <Form
                                inputRef={inputRef}
                                labelRef={labelRef}
                                isSignup={isSignup}
                                dispatch={dispatch}
                                state={state}
                                isForgot={isForgot}
                            />
                        }
                    </>

                ) : (
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
                    </div>
                )
            }


        </div >
    )
}

export default Auth
