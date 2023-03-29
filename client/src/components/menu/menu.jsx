import React, { Fragment, useEffect, useRef } from 'react'
import {
  Avatar, Bar, Light, LogOut, Message,
  Moon, Plus, Tab, Trash, Xicon
} from '../../assets/'
import './style.scss'
import { useNavigate } from 'react-router-dom'

const Menu = ({ changeColorMode, darkMode, history, setHistory }) => {
  const menuRef = useRef(null)
  const btnRef = useRef(null)

  const navigate = useNavigate()

  const showMenuMd = () => {
    menuRef.current.classList.add("showMd")
    document.body.style.overflowY = "hidden"
  }

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (!menuRef?.current?.contains(e.target)
        && !btnRef?.current?.contains(e.target)) {
        menuRef.current.classList?.remove("showMd")
        document.body.style.overflowY = "auto"
      }
    })

    window.addEventListener('resize', () => {
      if (!window.matchMedia("(max-width:767px)").matches) {
        document.body.style.overflowY = "auto"
      } else {
        if (menuRef.current.classList.contains('showMd')) {
          document.body.style.overflowY = "hidden"
        } else {
          document.body.style.overflowY = "auto"
        }
      }
    })
  })

  return (
    <Fragment>
      <header >
        <div className='start'>
          <button onClick={showMenuMd} ref={btnRef}><Bar /></button>
        </div>

        <div className='title'>
          New chat
        </div>

        <div className='end'>
          <button><Plus /></button>
        </div>
      </header>

      <div className="menu" ref={menuRef}>
        <div>
          <button
            type='button'
            aria-label='new'
            onClick={() => {
              navigate('/')
            }}
          >
            {<Plus />}New Chat
          </button>
        </div>

        <div className="history">
          {
            history?.map((obj, key) => {
              if (obj.active) {
                return (
                  <button key={key}
                    className='active'
                    onClick={() => {
                      navigate('/chat/sample')
                    }}
                  >{<Message />}
                    Clear conversationsaaaaaaaaaaaaaaaaaa
                  </button>
                )
              } else {
                return (
                  <button key={key}
                    onClick={() => {
                      navigate('/chat/sample')
                    }}
                  >{<Message />}Upgrade to Plus <span>New</span></button>)
              }
            })
          }
        </div>

        <div className="actions">
          <button>{<Trash />}Clear conversations</button>
          <button>{<Avatar />}Upgrade to Plus <span>New</span></button>
          {
            !darkMode ? <button onClick={() => changeColorMode(true)}><Moon />Dark mode</button>
              : <button onClick={() => changeColorMode(false)}><Light />Light mode</button>
          }
          <button>{<Tab />}Updates & FAQ</button>
          <button onClick={() => alert("You can't logout its guest account")} >
            {<LogOut />}Log out
          </button>
        </div>
      </div >

      <div className="exitMenu">
        <button><Xicon /></button>
      </div>
    </Fragment>
  )
}

export default Menu