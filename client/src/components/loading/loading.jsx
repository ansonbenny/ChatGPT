import React from 'react'
import { GptIcon } from '../../assets'
import './style.scss'

const Loading = () => {
    return (
        <div data-for='Loading'>
            <div className="inner">
                <GptIcon />
                <div data-for="text">Please stand by, while we are checking your browser...</div>
            </div>
        </div>
    )
}

export default Loading
