import { useLayoutEffect, useState } from "react"
import { Menu } from "./components"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Error, Forgot, Login, Main, Signup } from "./page"
import Loading from "./components/loading/loading"
import axios from 'axios'

const App = () => {
  let path = window.location.pathname

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

  })

  useLayoutEffect(() => {

  }, [path])

  /// Loading

  return (
    <section className={false ? 'main-grid' : null}>
      <BrowserRouter>
        {false && (<div>
          <Menu
            changeColorMode={changeColorMode}
            darkMode={darkMode}
            history={history}
            setHistory={setHistory}
          />
        </div>)}

        {false && <Loading />}

        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/chat" element={<Main />} />
          <Route path="/chat/:id" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/auth" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/pending/:id" element={<Signup />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/forgot/set/:userId/:secret" element={<Forgot />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </section>
  )
}

export default App