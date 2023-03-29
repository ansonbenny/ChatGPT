import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { GptIcon } from '../../assets'
import './style.scss'

const Chat = forwardRef(({ error, response }, ref) => {
  const contentRef = useRef()
  const [currInterval, setCurrInterval] = useState()

  function loadResponse(type, dispatch) {
    let index = 0
    if (type) {
      dispatch({ type: 'resume', status: true })
      contentRef.current.classList.add("blink")
      setCurrInterval(setInterval(() => {
        if (index < response.length) {
          if (index === 0) {
            contentRef.current.innerHTML = response.charAt(index)
          } else {
            contentRef.current.innerHTML += response.charAt(index)
          }
          index++
        } else {
          dispatch({ type: 'resume', status: false })
          contentRef.current.classList.remove('blink')
          clearInterval(currInterval)
        }
      }, 20))
    } else {
      index = 0
      contentRef.current.classList.remove('blink')
      dispatch({ type: 'resume', status: false })
      clearInterval(currInterval)
    }
  }

  useImperativeHandle(ref, () => ({
    loadResponse
  }))

  return (
    <div className='Chat'>
      <div className='qs'>
        <div className='acc'>
          A
        </div>
        <div className='txt'>
          Explain quantum computing in simple terms
        </div>
      </div>

      <div className="res">
        <div className='icon'>
          <GptIcon />
          {error && <span>!</span>}
        </div>
        <div className='txt'>
          {
            error ? <div className="error">
              Something went wrong. If this issue persists please contact us through our help center at help.openai.com.
            </div> : <span ref={contentRef} className="blink" />
          }
        </div>
      </div>
    </div>
  )
})
export default Chat