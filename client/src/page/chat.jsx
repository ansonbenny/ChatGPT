import React, { useEffect, useRef } from 'react'
import { Reload, Rocket, Stop } from '../assets'
import { Chat, New } from '../components'
import { useParams } from 'react-router-dom';
import './style.scss'

const Main = () => {

    const textAreaRef = useRef(null)
    const { id } = useParams()

    useEffect(() => {
        textAreaRef.current.addEventListener('input', (e) => {
            textAreaRef.current.style.height = 'auto'
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
        })
    })

    return (
        <div className="main">

            <div className="contentArea">
                {
                    id ? <Chat /> : <New />
                }
            </div>

            <div className='inputArea'>

                <div className="chatActionsLg">
                    {
                        id && (
                            <>
                                {
                                    true ? <button><Reload /> Regerate response</button>
                                        : <button><Stop /> Stop generating</button>
                                }
                            </>
                        )
                    }
                </div>

                <div className="flexBody">
                    <div className="box">
                        <textarea ref={textAreaRef} />
                        {
                            !id ? <button>{<Rocket />}</button>
                                : (
                                    <div className="loading">
                                        <div className="dot" />
                                        <div className="dot-2 dot" />
                                        <div className="dot-3 dot" />
                                    </div>
                                )
                        }
                    </div>

                    {
                        id && (
                            <>
                                {
                                    true ? <div className="chatActionsMd">
                                        <button><Reload /></button>
                                    </div>
                                        : <div className="chatActionsMd">
                                            <button><Stop /></button>
                                        </div>
                                }
                            </>
                        )
                    }
                </div>

                <div className="text">
                    <a
                        target='_blank'
                        href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
                    >ChatGPT Mar 14 Version.</a> Free Research Preview. Our goal is to make AI systems more natural and safe to interact with. Your feedback will help us improve.
                </div>

            </div>
        </div>
    )
}

export default Main
