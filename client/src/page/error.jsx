import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading } from '../redux/loading'
import './style.scss'

const Error = ({ status, content }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(setLoading({ site: false }))
        }, 1000)
    }, [])
    return (
        <div className='Error'>
            <div className="flex">
                <div className='code'>
                    {status}
                </div>
                <div className='txt'>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Error
