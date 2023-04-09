import React, { useEffect, useReducer, useRef, useState } from 'react'
import { Reload, Rocket, Stop } from '../assets'
import { Chat, New } from '../components'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import './style.scss'
import { setLoading } from '../redux/loading';
import { useDispatch, useSelector } from 'react-redux';

const reducer = (state, { type, status }) => {
    switch (type) {
        case 'chat':
            return { chat: status, loading: status, resume: status }
        case 'error':
            return { chat: true, error: status }
        case 'loading':
            return { chat: true, loading: status }
        case 'resume':
            return { chat: true, resume: status, loading: status }
        default: return state
    }
}

const Main = () => {
    const { id } = useParams()

    const { user } = useSelector((state) => state)

    const dispatch = useDispatch()

    const textAreaRef = useRef(null)

    const chatRef = useRef()

    const [prompt, setPrompt] = useState('')
    const response = "Here is an example of a basic React component that displays a message:\n\n```jsx\nimport React from 'react'\n\nclass Message extends React.Component {\n  render() {\n    return (\n      <div>\n        <h1>Hello, World!</h1>\n        <p>This is a basic React component.</p>\n      </div>\n    )\n  }\n}\n```\n\nIn this example, we are using the `import` statement to include the React library in our code. We are also extending the `React.Component` class to create our own component called `Message`.\n\nThe `render` method is a required function that returns the HTML to be rendered on the page. In this case, we are rendering a `div` element with an `h1` header and a paragraph (`p`) element. These elements will display the message \"Hello, World! This is a basic React component.\"\n\nWe can use this component in other parts of our application by importing it and inserting it into other components or pages.\n\nReact is a powerful library for building user interfaces, allowing developers to build reusable components that can be combined to create complex and dynamic applications."

    const [status, stateAction] = useReducer(reducer, {
        chat: false,
        loading: false,
        error: false,
        resume: false
    })

    useEffect(() => {
        textAreaRef.current?.addEventListener('input', (e) => {
            textAreaRef.current.style.height = 'auto'
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
        })
    })

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                dispatch(setLoading(false))
            }, 1000)
        }
    }, [user])

    const FormHandle = async () => {
        if (prompt?.length > 0) {
            let res = null
            stateAction({ type: 'chat', status: true })
            try {
                res = await axios.post('/api/openais', {
                    prompt
                })
            } catch (err) {
                stateAction({ type: 'error', status: true })
            } finally {
                if (res) {
                    chatRef.current.loadResponse(stateAction)
                    stateAction({ type: 'error', status: false })
                }
            }
        }
    }

    return (
        <div className="main">

            <div className="contentArea">
                {
                    status.chat ? <Chat ref={chatRef} error={status.error} response={response} />
                        : <New setPrompt={setPrompt} />
                }
            </div>

            <div className='inputArea'>

                {
                    !status.error ? (
                        <>
                            <div className="chatActionsLg">
                                {
                                    status.chat && (
                                        <>
                                            {
                                                !status.resume ? <button
                                                    onClick={() => {
                                                        chatRef.current.loadResponse(stateAction)
                                                    }} ><Reload /> Regenerate response</button>
                                                    : <button
                                                        onClick={() => {
                                                            chatRef.current.stopResponse(stateAction)
                                                        }} ><Stop /> Stop generating</button>
                                            }
                                        </>
                                    )
                                }
                            </div>

                            <div className="flexBody">
                                <div className="box">
                                    <textarea placeholder='Send a message...' ref={textAreaRef} value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                    />
                                    {
                                        !status.loading ? <button onClick={FormHandle}>{<Rocket />}</button>
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
                        </>
                    ) : (
                        <div className="error">
                            <p>There was an error generating a response</p>
                            <button onClick={FormHandle} ><Reload />Regenerate response</button>
                        </div>
                    )
                }

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
