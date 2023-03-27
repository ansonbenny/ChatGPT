import React from 'react'
import './style.scss'

const Error = () => {
    return (
        <div className='Error'>
            <div className="flex">
                <div className='code'>
                    404
                </div>
                <div className='txt'>
                    This page could not be found.
                </div>
            </div>
        </div>
    )
}

export default Error
