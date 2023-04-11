import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import {
  Avatar, Bar, Light, LogOut, Message,
  Moon, Plus, Tab, Tick, Trash, Xicon
} from '../../assets/'
import './style.scss'
import axios from 'axios'
import { emptyUser } from '../../redux/user'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { activePage, addHistory } from '../../redux/history'

const Menu = ({ changeColorMode, darkMode }) => {
  let path = window.location.pathname

  const menuRef = useRef(null)
  const btnRef = useRef(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { history } = useSelector((state) => state)
  const [confirm, setConfim] = useState(false)

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

  const clearHistory = async (del) => {
    if (del) {
      let res = null

      try {
        res = axios.delete('/api/chat/all')
      } catch (err) {
        alert("Error")
        console.log(err)
      } finally {
        if (res) {
          navigate('/chat')
          dispatch(addHistory([]))
        }

        setConfim(false)
      }
    } else {
      setConfim(true)
    }
  }

  const showMenuMd = () => {
    menuRef.current.classList.add("showMd")
    document.body.style.overflowY = "hidden"
  }

  //Menu

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (!menuRef?.current?.contains(e.target)
        && !btnRef?.current?.contains(e.target)) {
        menuRef?.current?.classList?.remove("showMd")
        document.body.style.overflowY = "auto"
      }
    })

    window.addEventListener('resize', () => {
      if (!window.matchMedia("(max-width:767px)").matches) {
        document.body.style.overflowY = "auto"
      } else {
        if (menuRef?.current?.classList?.contains('showMd')) {
          document.body.style.overflowY = "hidden"
        } else {
          document.body.style.overflowY = "auto"
        }
      }
    })
  })

  // History Get
  useEffect(() => {
    const getHistory = async () => {
      let res = null
      try {
        res = await axios.get('/api/chat/history')
      } catch (err) {
        console.log(err)
      } finally {
        if (res?.data) {
          dispatch(addHistory(res?.data?.data))
        }
      }
    }

    getHistory()
  }, [path])

  // History active
  useEffect(() => {
    setConfim(false)
    let chatId = path.replace('/chat/', '')
    chatId = chatId.replace('/', '')
    dispatch(activePage(chatId))
  }, [path, history])

  return (
    <Fragment>
      <header >
        <div className='start'>
          <button onClick={showMenuMd} ref={btnRef}><Bar /></button>
        </div>

        <div className='title'>
          {
            path.length > 6 ? history[0]?.prompt : 'New chat'
          }
        </div>

        <div className='end'>
          <button onClick={() => {
            if (path.includes('/chat')) {
              navigate('/')
            } else {
              navigate('/chat')
            }
          }}><Plus /></button>
        </div>
      </header>

      <div className="menu" ref={menuRef}>
        <div>
          <button
            type='button'
            aria-label='new'
            onClick={() => {
              if (path.includes('/chat')) {
                navigate('/')
              } else {
                navigate('/chat')
              }
            }}
          >
            {<Plus />}New chat
          </button>
        </div>

        <div className="history">
          {
            history?.map((obj, key) => {
              if (obj?.active) {
                return (
                  <button key={key}
                    className='active'
                    onClick={() => {
                      navigate(`/chat/${obj?.chatId}`)
                    }}
                  >{<Message />}
                    {obj?.prompt}
                  </button>
                )
              } else {
                return (
                  <button key={key}
                    onClick={() => {
                      navigate(`/chat/${obj?.chatId}`)
                    }}
                  >{<Message />}{obj?.prompt}</button>)
              }
            })
          }
        </div>

        <div className="actions">
          {
            history?.length > 0 && (
              <>
                {
                  confirm ? <button onClick={() => clearHistory(true)}>{<Tick />}Confirm clear conversations</button>
                    : <button onClick={() => clearHistory(false)}>{<Trash />}Clear conversations</button>
                }
              </>
            )
          }
          <button>{<Avatar />}Upgrade to Plus <span>New</span></button>
          {
            !darkMode ? <button onClick={() => changeColorMode(true)}><Moon />Dark mode</button>
              : <button onClick={() => changeColorMode(false)}><Light />Light mode</button>
          }
          <button onClick={() => {
            window.open('https://help.openai.com/en/collections/3742473-chatgpt', '_blank')
          }}>{<Tab />}Get help</button>
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