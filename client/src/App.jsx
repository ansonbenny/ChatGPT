import { useEffect, useLayoutEffect, useState } from "react"
import { Menu } from "./components"
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Error, Forgot, Login, Main, Signup } from "./page"
import Loading from "./components/loading/loading"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setLoading } from "./redux/loading"
import { emptyUser, insertUser } from "./redux/user"
import { emptyAllRes } from "./redux/messages"

const App = () => {
  let path = window.location.pathname

  const [offline, setOffline] = useState(!window.navigator.onLine)

  const [darkMode, setDarkMode] = useState(false)

  const { loading, user } = useSelector((state) => state)

  const dispatch = useDispatch()

  const navigate = useNavigate()

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
        if (err?.response?.data?.status === 405) {
          dispatch(emptyUser())
          dispatch(emptyAllRes())
          if (!nonAuthUrls.find(elm => window.location.href.includes(elm))) {
            navigate('/login')
          }
        } else if (err?.code !== 'ERR_NETWORK') {
          navigate('/something-went-wrong')
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

  // Offline
  useEffect(() => {
    window.addEventListener('online', (e) => {
      location.reload()
    })

    window.addEventListener('offline', (e) => {
      setOffline(true)
    })
  })

  return (
    <section className={user ? 'main-grid' : null}>
      {user && (<div>
        <Menu
          changeColorMode={changeColorMode}
        />
      </div>)}

      {loading && <Loading />}

      {offline && <Error
        status={503}
        content={'Website in offline check your network.'}
      />}

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
        <Route path="*" element={<Error
          status={404}
          content={'This page could not be found.'}
        />} />
      </Routes>
    </section>
  )
}

export default App
