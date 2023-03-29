import { useLayoutEffect, useState } from "react"
import { Menu } from "./components"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Error, Main } from "./page"
import axios from 'axios'

const App = () => {
  const [darkMode, setDarkMode] = useState(false)

  const [history, setHistory] = useState([{
    prompt: '',
    _id: 'aa',
    active: true
  }])

  const changeColorMode = (to) => {
    if (to) {
      localStorage.setItem('darkMode', true)

      document.body.className = "dark"

    } else {

      localStorage.removeItem('darkMode')

      document.body.className = "light"
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

    axios.get('/api/openai').then((res)=>{
      console.log(res)
    })

  })

  return (
    <section className='main-grid'>
      <BrowserRouter>
        <div>
          <Menu
            changeColorMode={changeColorMode}
            darkMode={darkMode}
            history={history}
            setHistory={setHistory}
          />
        </div>

        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/chat" element={<Main />} />
          <Route path="/chat/:id" element={<Main />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </section>
  )
}

export default App