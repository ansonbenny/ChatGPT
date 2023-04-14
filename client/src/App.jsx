import { useEffect, useLayoutEffect, useState } from "react"
import { Menu } from "./components"
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Error, Forgot, Login, Main, Signup } from "./page"
import Loading from "./components/loading/loading"
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from "./redux/loading"
import { emptyUser, insertUser } from "./redux/user"
import { emptyAllRes } from "./redux/messages"
import instance from "./config/instance"

const App = () => {
  let path = window.location.pathname

  const [offline, setOffline] = useState(!window.navigator.onLine)

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
  }

  // Dark & Light Mode
  useLayoutEffect(() => {
    let mode = localStorage.getItem('darkMode')

    if (mode) {
      changeColorMode(true)
    } else {
      changeColorMode(false)
    }

  })

  // Logged Checking 
  useLayoutEffect(() => {
    dispatch(setLoading({ api: true, site: true }))
    const getResponse = async () => {

      let res = null

      try {
        res = await instance.get('/api/user/checkLogged')
        if (res?.data?.data) {
          dispatch(insertUser(res?.data?.data))
        }
      } catch (err) {
        console.log(err)
        dispatch(setLoading({ api: false }))

        if (err?.response?.data?.status === 405) {
          dispatch(emptyUser())
          dispatch(emptyAllRes())

          if (path === '/' || window.location.href.includes(`${window.location.origin}/chat`)) {
            navigate('/login')
          }

        } else if (err?.code !== 'ERR_NETWORK') {
          navigate('/something-went-wrong')
        }
      } finally {
        if (res?.data?.status === 208) {
          dispatch(setLoading({ api: false }))

          if (window.location.href.includes(`${window.location.origin}/login`) ||
            window.location.href.includes(`${window.location.origin}/signup`) ||
            window.location.href.includes(`${window.location.origin}/forgot`)) {
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

      {loading?.site && <Loading />}

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
