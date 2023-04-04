import React from 'react'
import { ForgotComponent } from '../components'

const Forgot = () => {
    // if user not show

    return (
        <div className='Auth'>
            <div className="inner">

                <ForgotComponent />

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
