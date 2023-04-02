import React from 'react'
import { Auth } from '../components'

const Forgot = () => {
    return (
        <div className='Auth'>
            <div className="inner">

                <Auth
                    isForgot
                    alert={`Enter your email address and we will send you instructions to reset your password.`}
                    title={`Reset your password `}
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

export default Forgot
