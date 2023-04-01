import React from 'react'
import { Auth } from '../components'
import './style.scss'

const Signup = () => {
  return (
    <div className='Auth'>
      <div className="inner">

        <Auth
          isSignup
          alert={`Please note that phone verification is required for signup. Your number will only be used to verify your identity for security purposes.`}
          title={`Create your account`}
        />

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

export default Signup
