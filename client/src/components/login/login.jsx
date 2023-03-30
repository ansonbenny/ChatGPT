import React, { useRef } from 'react'
import { GptIcon } from '../../assets'
import './style.scss'

const LoginComponent = () => {
  const labelRef = useRef()
  const inputRef = useRef()
  return (
    <div className='Login'>
      <div>
        <GptIcon />
      </div>

      <div>
        <h1>Welcome back</h1>
      </div>

      <div className='options'>
        <div className="manual">
          <div>
            <label ref={labelRef}>Email address</label>
            <input ref={inputRef} type="text" onFocus={() => {
              labelRef.current?.classList.add("active-label", "active-label-green")
              inputRef.current?.classList.add("active-input", "active-input-green")
            }} onBlur={() => {
              if (inputRef.current?.value.length <= 0) {
                labelRef.current?.classList.remove("active-label", "active-label-green")
                inputRef.current?.classList.remove("active-input", "active-input-green")
              } else {
                labelRef.current?.classList.remove("active-label-green")
                inputRef.current?.classList.remove("active-input-green")
              }
            }} />
          </div>
          <div>
            <button></button>
          </div>
        </div>

        <div className="extra">

        </div>
      </div>
    </div>
  )
}

export default LoginComponent
