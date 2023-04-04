import React, { Fragment, useCallback, useReducer, useRef, useState } from 'react'
import { GptIcon, Eye, EyeHide, Tick, Google, Microsoft, Mail } from '../../assets'
import { Link, useNavigate } from 'react-router-dom'
import FormFeild from './FormFeild'
import axios from 'axios'
import './style.scss'

const reducer = (state, { type, status }) => {
  switch (type) {
    case 'filled':
      return { filled: status }
    case 'showPass':
      return { showPass: status, filled: state.filled }
    case 'error':
      return { error: status, filled: state.filled, showPass: state.showPass }
    case 'mail':
      return { mail: status, error: !status }
    default: return state
  }
}

const SignupComponent = ({_id}) => {

  const labelRef = useRef()
  const inputRef = useRef()

  const navigate = useNavigate()

  const [state, dispatch] = useReducer(reducer, {
    filled: false,
    error: false
  })

  const [formData, setFormData] = useState({
    email: '',
    pass: '',
    manual: false
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
      res = await axios.post('/api/user/signup', formData)
    } catch (err) {
      console.log(err)
      if (err?.['message']?.exists) {
        dispatch({ type: 'error', status: true })
      } else {
        dispatch({ type: 'error', status: false })
      }
    } finally {
      if (res?.['data']?.data?.manual) {
        dispatch({ type: 'mail', status: true })
      } else if (res) {
        dispatch({ type: 'error', status: false })
        if (res['data']?.data?._id) navigate(`/signup/pending/${res?.['data']._id}`)
      } else {
        dispatch({ type: 'error', status: true })
      }
    }
  }

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
              <h1>Create your account</h1>

              <p>Please note that phone verification is required for signup. Your number will only be used to verify your identity for security purposes.</p>

            </div>

            {
              !state.filled ? (
                <div className='options'>
                  <form className="manual" onSubmit={(e) => {
                    e.preventDefault()
                    setFormData({ ...formData, manual: true })
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
                    <span>Already have an account?</span>
                    <Link to={'/login/auth'}>Log in</Link>
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
                        inputRef={null}
                        labelRef={null}
                        name={'email'}
                        type={"email"}
                        isDisabled />

                      {state.error && <div className='error'><div>!</div> The user already exists.</div>}
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

                  </div>
                  <div data-for="acc-sign-up-login">
                    <span>Already have an account?</span>
                    <Link to={'/login/auth'}>Log in</Link>
                  </div>
                </form>
              )
            }
          </Fragment>
        ) : (
          <div className='mail'>
            <div className='icon'>
              <Mail />
            </div>

            <div>
              <h3>Check Your Email</h3>
            </div>

            <div>
              <p>Please check the email address {formData.email} for instructions to reset your password.</p>
            </div>

            <button onClick={formHandle}>Resend Mail</button>
          </div >
        )
      }
    </div >
  )
}

export default SignupComponent
