import React, {
  forwardRef,
  useImperativeHandle, useRef
} from 'react'
import { GptIcon } from '../../assets'
import './style.scss'

const Chat = forwardRef(({ error, response }, ref) => {
  const contentRef = useRef()

  const loadResponse = (stateAction) => {

    stateAction({ type: 'resume', status: true })

    contentRef.current.classList.add("blink")

    let index = 0

    window.interval = setInterval(() => {
      if (index < response.length) {
        if (index === 0) {
          contentRef.current.innerHTML = response.charAt(index)
        } else {
          contentRef.current.innerHTML += response.charAt(index)
        }
        index++
      } else {
        stopResponse(stateAction)
      }
    }, 20)

  }

  const stopResponse = (stateAction) => {
    contentRef.current.classList.remove('blink')
    stateAction({ type: 'resume', status: false })
    clearInterval(window.interval)
  }

  useImperativeHandle(ref, () => ({
    stopResponse,
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