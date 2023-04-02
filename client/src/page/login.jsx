import React, { useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GptIcon } from '../assets'
import { Auth } from '../components'

const Login = () => {
  const [auth, setAuth] = useState(false)

  const navigate = useNavigate()

  const path = window.location.pathname

  useLayoutEffect(() => {
    if (path === '/login/auth') {
      setAuth(true)
    } else {
      setAuth(false)
    }
  }, [path])
  
  return (
    <div className='Auth'>
      <div className="inner">

        {
          auth ? (
            <Auth title={`Welcome back`} />
          ) : (
            <div className='suggection'>
              <div>
                <GptIcon />
              </div>

              <div>
                <p>Welcome to ChatGPT</p>
                <p>Log in with your OpenAI account to continue</p>
              </div>

              <div className="btns">
                <button onClick={() => {
                  navigate('/login/auth')
                }}>Log in</button>
                <button onClick={() => {
                  navigate('/signup')
                }}>Sign up</button>
              </div>
            </div>
          )
        }

        <div className="bottum">
          <div className='start'>
            <a href="https://openai.com/policies/terms-of-use" target='_blank'>Terms of use</a>
          </div>
          <div className='end'>
            <a href="https://openai.com/policies/privacy-policy" target='_blank'>Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
