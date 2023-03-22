import { useEffect, useRef, useState } from "react"
import { Rocket } from "./assets"
import { Chat, Menu, New } from "./components"

const App = () => {
  const [lightMode, setLightMode] = useState(false)

  const textAreaRef = useRef(null)

  const changeColorMode = () => {
    if (lightMode) {

      document.body.classList.add("light")
      document.body.classList.remove("dark")

      let element = document.querySelectorAll('.currentColor')

      element.forEach(ele => {
        ele.style.color = "#343541"
      })

    } else {

      document.body.classList.add("dark")
      document.body.classList.remove("light")

      let element = document.querySelectorAll('.currentColor')

      element.forEach(ele => {
        ele.style.color = "#ECECF1"
      })

    }

    setLightMode(!lightMode)
  }

  useEffect(() => {
    textAreaRef.current.addEventListener('input', (e) => {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
    })
  })

  return (
    <section className='main-grid'>
      <div>
        <Menu changeColorMode={changeColorMode} />
      </div>

      <div className="main">

        <div className="contentArea">
          <New />
        </div>

        <div className='inputArea'>

          <div className="box">
            <div className="flex">
              <textarea ref={textAreaRef} />
              <button>{<Rocket />}</button>
            </div>
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