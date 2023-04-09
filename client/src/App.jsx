import { useEffect, useLayoutEffect, useState } from "react"
import { Menu } from "./components"
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Error, Forgot, Login, Main, Signup, Offline } from "./page"
import Loading from "./components/loading/loading"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setLoading } from "./redux/loading"
import { emptyUser, insertUser } from "./redux/user"

const App = () => {
  let path = window.location.pathname

  const [offline, setOffline] = useState(!window.navigator.onLine)

  const { loading, user } = useSelector((state) => state)

  const dispatch = useDispatch()

  const navigate = useNavigate()

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

  // Dark & Light Mode
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

  // Offline
  useEffect(() => {
    window.addEventListener('online', (e) => {
      location.reload()
    })

    window.addEventListener('offline', (e) => {
      setOffline(true)
    })
  })

  // Logged Checking
  useLayoutEffect(() => {
    dispatch(setLoading(true))
    const getResponse = async () => {

      let nonAuthUrls = [`${window.location.origin}/login`,
      `${window.location.origin}/forgot`,
      `${window.location.origin}/signup`,
      `${window.location.origin}/404`]

      let res = null

      try {
        res = await axios.get('/api/user/checkLogged')
        if (res?.data?.data) {
          dispatch(insertUser(res?.data?.data))
        }
      } catch (err) {
        console.log(err)
        if (!nonAuthUrls.find(elm => window.location.href.includes(elm))) {
          dispatch(emptyUser())
          navigate('/login')
        }
      } finally {
        if (res?.data?.status === 208) {
          nonAuthUrls.splice(3, 1)
          if (nonAuthUrls.find(elm => window.location.href.includes(elm))) {
            navigate('/')
          }
        }
      }
    }

    if (!offline) {
      getResponse()
    }
  }, [path])

  return (
    <section className={user ? 'main-grid' : null}>
      {user && (<div>
        <Menu
          changeColorMode={changeColorMode}
          darkMode={darkMode}
          history={history}
          setHistory={setHistory}
        />
      </div>)}

      {loading && <Loading />}

      {offline && <Offline />}

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
    </section>
  )
}

export default App
