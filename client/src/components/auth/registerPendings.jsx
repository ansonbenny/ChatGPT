import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GptIcon } from '../../assets'
import instance from '../../config/instance'
import './style.scss'

const RegisterPendings = ({ _id }) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fName: '',
    lName: ''
  })

  const formHandle = async (e) => {
    e.preventDefault()
    if (formData?.fName && formData?.lName) {
      let res = null
      try {
        res = await instance.put('/api/user/signup-finish', {
          fName: formData.fName,
          lName: formData.lName,
          _id
        })
      } catch (err) {
        console.log(err)
        if (err?.response?.data?.status === 422) {
          alert("Already Registered")
          navigate('/login')
        } else {
          alert(err)
        }
      } finally {
        if (res?.data?.status === 208) {
          navigate('/')
        } else if (res) {
          navigate('/login')
        }
      }
    } else {
      alert("Enter full name")
    }
  }

  return (
    <div className='Contain'>
      <div className='icon'>
        <GptIcon />
      </div>

      <h1>Tell us about you</h1>

      <form className="pendings" onSubmit={formHandle}>
        <div className="fullName">
          <input type="text"
            value={formData.fName} placeholder='First name' onInput={(e) => {
              setFormData({ ...formData, fName: e.target.value })
            }} />
          <input type="text" value={formData.lName} placeholder='Last name' onInput={(e) => {
            setFormData({ ...formData, lName: e.target.value })
          }} />
        </div>

        <button type='submit'>Continue</button>

        <div>
          <p>By clicking "Continue", you agree to our <span>Terms</span>, <br /><span>Privacy policy</span> and confirm you're 18 years or older.</p>
        </div>
      </form>

    </div >
  )
}


export default RegisterPendings
