import React from 'react'
import { Sun, Thunder, Warning } from '../../assets'
import './style.scss'

const New = () => {
  return (
    <div className='New'>
      <div>
        <h1 className='title currentColor'>ChatGPT</h1>
      </div>

      <div className="grid">
        <div>
          <div className='card'>
            <Sun />
            <h4 className='currentColor'>Examples</h4>
          </div>

          <div className='card card-bg-light hover'>
            <p className='currentColor'>"Explain quantum computing in simple terms"</p>
          </div>

          <div className='card card-bg-light hover'>
            <p className='currentColor'>"Got any creative ideas for a 10 year old’s birthday?"</p>
          </div>

          <div className='card card-bg-light hover'>
            <p className='currentColor'>"How do I make an HTTP request in Javascript?"</p>
          </div>
        </div>

        <div>
          <div className="card">
            <Thunder />
            <h4 className="currentColor">Capabilities</h4>
          </div>

          <div className='card card-bg-light'>
            <p className='currentColor'>"Remembers what user said earlier in the conversation"</p>
          </div>

          <div className='card card-bg-light'>
            <p className='currentColor'>"Allows user to provide follow-up corrections"</p>
          </div>

          <div className='card card-bg-light'>
            <p className='currentColor'>"Trained to decline inappropriate requests"</p>
          </div>
        </div>

        <div>
          <div className="card">
            <Warning />
            <h4 className="currentColor">Limitations</h4>
          </div>

          <div className='card card-bg-light'>
            <p className='currentColor'>"May occasionally generate incorrect information"</p>
          </div>

          <div className='card card-bg-light'>
            <p className='currentColor'>"May occasionally produce harmful instructions or biased content"</p>
          </div>

          <div className='card card-bg-light'>
            <p className='currentColor'>"Limited knowledge of world and events after 2021"</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New