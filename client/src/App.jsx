import { useState } from "react"
import { Chat, Menu, New } from "./components"

const App = () => {
  const [lightMode, setLightMode] = useState(false)

  const changeColorMode = () => {
    if (lightMode) {
      document.body.style.background = "white"
      let element = document.querySelectorAll('.currentColor')

      element.forEach(ele => {
        ele.style.color = "#343541"
      })

      let cards = document.querySelectorAll('.card-bg-dark')

      cards.forEach(ele => {
        ele.classList.add('card-bg-light')
        ele.classList.remove('card-bg-dark')
      })

    } else {

      document.body.style.background = "rgba(52,53,65,1)"
      let element = document.querySelectorAll('.currentColor')

      element.forEach(ele => {
        ele.style.color = "#ECECF1"
      })

      let cards = document.querySelectorAll('.card-bg-light')

      cards.forEach(ele => {
        ele.classList.add('card-bg-dark')
        ele.classList.remove('card-bg-light')
      })

    }

    setLightMode(!lightMode)
  }

  return (
    <section className='main-grid'>
      <div>
        <Menu />
      </div>

      <div className="main">
        <div className="contentArea">
          <New />
        </div>
        <div className='inputArea'>
          aa
          <button onClick={changeColorMode}>change bg</button>
        </div>
      </div>
    </section>
  )
}

export default App