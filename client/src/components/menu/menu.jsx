import React, { Fragment, useEffect, useRef } from 'react'
import {
  Avatar, Bar, Light, LogOut, Message,
  Moon, Plus, Tab, Trash, Xicon
} from '../../assets/'
import './style.scss'

const Menu = ({ changeColorMode, lightMode }) => {
  const menuRef = useRef(null)
  const btnRef = useRef(null)

  const showMenuMd = () => {
    menuRef.current.classList.add("showMd")
  }


  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (!menuRef?.current?.contains(e.target)
        && !btnRef?.current?.contains(e.target)) {
        menuRef.current.classList.remove("showMd")
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
          >
            {<Plus />}New Chat
          </button>
        </div>

        <div className="history">
          <button>{<Message />}
            Clear conversationsaaaaaaaaaaaaaaaaaa
          </button>
          <button>{<Message />}Upgrade to Plus <span>New</span></button>
          <button>{<Message />}Updates & FAQ</button>
          <button>{<Message />}Log out</button>
          <button>{<Message />}Clear conversations</button>
          <button>{<Message />}Upgrade to Plus <span>New</span></button>
          <button>{<Message />}Updates & FAQ</button>
          <button>{<Message />}Log out</button>
          <button>{<Message />}Clear conversations</button>
          <button>{<Message />}Upgrade to Plus <span>New</span></button>
          <button>{<Message />}Updates & FAQ</button>
          <button>{<Message />}Log out</button>
          <button>{<Message />}Clear conversations</button>
          <button>{<Message />}Upgrade to Plus <span>New</span></button>
          <button>{<Message />}Updates & FAQ</button>
          <button>{<Message />}Log out</button>
        </div>

        <div className="actions">
          <button>{<Trash />}Clear conversations</button>
          <button>{<Avatar />}Upgrade to Plus <span>New</span></button>
          {
            lightMode ? <button onClick={changeColorMode}><Moon />Dark mode</button>
              : <button onClick={changeColorMode}><Light />Light mode</button>
          }
          <button>{<Tab />}Updates & FAQ</button>
          <button>{<LogOut />}Log out</button>
        </div>
      </div >

      <div className="exitMenu">
        <button><Xicon /></button>
      </div>
    </Fragment>
  )
}

export default Menu