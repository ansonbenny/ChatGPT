import React from 'react'
import { GptIcon } from '../../assets'
import './style.scss'

const RegisterPendings = () => {

  return (
    <div className='Contain'>
      <div className='icon'>
        <GptIcon />
      </div>

      <h1>Tell us about you</h1>

      <div className="pendings">
        <div className="fullName">
          <input type="text" placeholder='First name' />
          <input type="text" placeholder='Last name' />
        </div>

        <button type='submit'>Continue</button>

        <div>
          <p>By clicking "Continue", you agree to our <span>Terms</span>, <br /><span>Privacy policy</span> and confirm you're 18 years or older.</p>
        </div>
      </div>

    </div >
  )
}


export default RegisterPendings
