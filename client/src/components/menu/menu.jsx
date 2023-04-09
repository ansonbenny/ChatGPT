import React, { Fragment, useEffect, useRef } from 'react'
import {
  Avatar, Bar, Light, LogOut, Message,
  Moon, Plus, Tab, Trash, Xicon
} from '../../assets/'
import './style.scss'
import axios from 'axios'
import { emptyUser } from '../../redux/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Menu = ({ changeColorMode, darkMode, history, setHistory }) => {
  const menuRef = useRef(null)
  const btnRef = useRef(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logOut = async () => {
    if (window.confirm("Do you want log out")) {
      let res = null
      try {
        res = await axios.get('/api/user/logout')
      } catch (err) {
        alert(err)
      } finally {
        if (res?.data?.status === 200) {
          alert("Done")
          dispatch(emptyUser())
          navigate('/login')
        }
      }
    }
  }

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
          <button onClick={logOut} >
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