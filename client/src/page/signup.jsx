import axios from 'axios'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RegisterPendings, SignupComponent } from '../components'
import './style.scss'

const Signup = () => {
  const [pending, setPending] = useState(false)
  const { id } = useParams()
  const path = window.location.pathname

  const navigate = useNavigate()

  // if user not show

  useLayoutEffect(() => {
    if (path === '/signup') {
      setPending(false)
    } else {
      const checkPending = async () => {
        let res = null
        try {
          res = await axios.get('/api/user/checkPending', {
            params: {
              _id: id
            }
          })
        } catch (err) {
          alert(err)
          console.log(err)
          navigate('/signup')
        } finally {
          if (res) {
            setPending(true)
          }
        }
      }

      checkPending()
    }
  }, [path])

  return (
    <div className='Auth'>
      <div className="inner">

        {
          pending ? <RegisterPendings _id={id} />
            : <>
              <SignupComponent />

              <div className="bottum">
                <div className='start'>
                  <a href="https://openai.com/policies/terms-of-use" target='_blank'>Terms of use</a>
                </div>
                <div className='end'>
                  <a href="https://openai.com/policies/privacy-policy" target='_blank'>Privacy Policy</a>
                </div>
              </div>
            </>
        }
      </div>
    </div>
  )
}

export default Signup
