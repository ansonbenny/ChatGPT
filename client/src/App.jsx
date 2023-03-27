import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Reload, Rocket, Stop } from "./assets"
import { Chat, Menu, New } from "./components"

const App = () => {
  const [darkMode, setDarkMode] = useState(false)

  const textAreaRef = useRef(null)

  const changeColorMode = (to) => {
    if (to) {
      localStorage.setItem('darkMode', true)

      document.body.classList.add("dark")
      document.body.classList.remove("light")

      let element = document.querySelectorAll('.currentColor')

      element.forEach(ele => {
        ele.style.color = "#ECECF1"
      })

    } else {

      localStorage.removeItem('darkMode')

      document.body.classList.add("light")
      document.body.classList.remove("dark")

      let element = document.querySelectorAll('.currentColor')

      element.forEach(ele => {
        ele.style.color = "#343541"
      })
    }

    setDarkMode(to)
  }

  useLayoutEffect(() => {

    let mode = localStorage.getItem('darkMode')

    if (mode) {
      setDarkMode(true)
      changeColorMode(true)
    } else {
      setDarkMode(false)
      changeColorMode(false)
    }

  }, [])

  useEffect(() => {
    textAreaRef.current.addEventListener('input', (e) => {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
    })
  })

  return (
    <section className='main-grid'>
      <div>
        <Menu
          changeColorMode={changeColorMode}
          darkMode={darkMode}
        />
      </div>

      <div className="main">

        <div className="contentArea">
          {
            true ? <Chat /> : <New />
          }
        </div>

        <div className='inputArea'>

          <div className="chatActionsLg">
            {
              true ? <button><Reload /> Regerate response</button>
                : <button><Stop /> Stop generating</button>
            }
          </div>

          <div className="flexBody">
            <div className="box">
              <textarea ref={textAreaRef} />
              {
                true ? <button>{<Rocket />}</button>
                  : (
                    <div className="loading">
                      <div className="dot" />
                      <div className="dot-2 dot" />
                      <div className="dot-3 dot" />
                    </div>
                  )
              }
            </div>

            {
              false && (
                <>
                  {
                    true ? <div className="chatActionsMd">
                      <button><Reload /></button>
                    </div>
                      : <div className="chatActionsMd">
                        <button><Stop /></button>
                      </div>
                  }
                </>
              )
            }
          </div>

          <div className="text">
            <a
              target='_blank'
              href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
            >ChatGPT Mar 14 Version.</a> Free Research Preview. Our goal is to make AI systems more natural and safe to interact with. Your feedback will help us improve.
          </div>

        </div>
      </div>
    </section>
  )
}

export default App