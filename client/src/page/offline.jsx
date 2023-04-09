import React from 'react'
import './style.scss'

const Offline = () => {
    return (
        <div>
            <div className='Error'>
                <div className="flex">
                    <div className='code'>
                        503
                    </div>
                    <div className='txt'>
                        Website in offline check your network.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Offline
