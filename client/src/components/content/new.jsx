import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { Sun, Thunder, Warning } from '../../assets'
import { livePrompt } from '../../redux/messages'
import './style.scss'

const New = memo(() => {
  const dispatch = useDispatch()
  return (
    <div className='New'>
      <div>
        <h1 className='title currentColor'>ChatGPT</h1>
      </div>

      <div className="flex">
        <div className='inner'>
          <div className='card'>
            <Sun />
            <h4 className='currentColor'>Examples</h4>
          </div>

          <div className='card card-bg hover' onClick={() => {
            dispatch(livePrompt("Explain quantum computing in simple terms"))
          }}>
            <p className='currentColor'>"Explain quantum computing in simple terms" →</p>
          </div>

          <div className='card card-bg hover' onClick={() => {
            dispatch(livePrompt("Got any creative ideas for a 10 year old’s birthday?"))
          }}>
            <p className='currentColor'>"Got any creative ideas for a 10 year old’s birthday?" →</p>
          </div>

          <div className='card card-bg hover' onClick={() => {
            dispatch(livePrompt("How do I make an HTTP request in Javascript?"))
          }}>
            <p className='currentColor'>"How do I make an HTTP request in Javascript?" →</p>
          </div>

        </div>

        <div className='inner'>
          <div className="card">
            <Thunder />
            <h4 className="currentColor">Capabilities</h4>
          </div>

          <div className='card card-bg'>
            <p className='currentColor'>Remembers what user said earlier in the conversation</p>
          </div>

          <div className='card card-bg'>
            <p className='currentColor'>Allows user to provide follow-up corrections</p>
          </div>

          <div className='card card-bg'>
            <p className='currentColor'>Trained to decline inappropriate requests</p>
          </div>

        </div>

        <div className='inner'>
          <div className="card">
            <Warning />
            <h4 className="currentColor">Limitations</h4>
          </div>

          <div className='card card-bg'>
            <p className='currentColor'>May occasionally generate incorrect information</p>
          </div>

          <div className='card card-bg'>
            <p className='currentColor'>May occasionally produce harmful instructions or biased content</p>
          </div>

          <div className='card card-bg'>
            <p className='currentColor'>Limited knowledge of world and events after 2021</p>
          </div>

        </div>
      </div>
    </div>
  )
})

export default New