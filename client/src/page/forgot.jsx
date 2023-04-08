import axios from 'axios'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ForgotComponent } from '../components'

const Forgot = () => {
    const { userId = null, secret = null } = useParams()
    const path = window.location.pathname
    const navigate = useNavigate()
    const [isRequest, setIsRequest] = useState(true)
    // if user not show
    useLayoutEffect(() => {
        if (path === '/forgot/' || path === '/forgot') {
            setIsRequest(true)
        } else {
            const getResponse = async () => {
                let res = null

                try {
                    res = await axios.get('/api/user/forgot-check', {
                        params: {
                            userId,
                            secret
                        }
                    })
                } catch (err) {
                    console.log(err)
                    if (err?.response?.status === 404) {
                        navigate('/404')
                    } else {
                        alert(err)
                        navigate('/forgot')
                    }
                } finally {
                    if (res?.data?.status === 208) {
                        navigate('/')
                    } else if (res) {
                        setIsRequest(false)
                    }
                }
            }

            getResponse()
        }
    }, [path])

    return (
        <div className='Auth'>
            <div className="inner">

                <ForgotComponent
                    isRequest={isRequest}
                    userId={userId}
                    secret={secret}
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
