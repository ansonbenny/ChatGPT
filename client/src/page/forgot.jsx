import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ForgotComponent } from '../components'
import instance from '../config/instance'
import { setLoading } from '../redux/loading'
import './style.scss'

const Forgot = () => {
    const { userId = null, secret = null } = useParams()
    const { user } = useSelector((state) => state)

    const path = window.location.pathname
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isRequest, setIsRequest] = useState(true)

    useEffect(() => {
        if (!user) {
            if (path === '/forgot/' || path === '/forgot') {
                setIsRequest(true)
                setTimeout(() => {
                    dispatch(setLoading(false))
                }, 1000)
            } else {
                const getResponse = async () => {
                    let res = null

                    try {
                        res = await instance.get('/api/user/forgot-check', {
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
                            setTimeout(() => {
                                dispatch(setLoading(false))
                            }, 1000)
                        }
                    }
                }

                getResponse()
            }
        }
    }, [path, user])

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
