import React, { useState } from 'react'
import { GptIcon } from '../assets'
import { Auth } from '../components'

const Login = () => {
  const [log, setLog] = useState(true)
  return (
    <div className='Auth'>
      <div className="inner">

        {
          log ? (
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
                <button>Log in</button>
                <button>Sign up</button>
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
