import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

const SessionContext = createContext()

export function SessionProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false)
  const [userName, setUserName] = useState('')

  const checkSession = async () => {
    try {
      const response = await axios.get('/check-session')
      const userData = response.data.user

      if (userData) {
        setIsLogin(true)
        setUserName(userData.name)
      } else {
        setIsLogin(false)
      }
    } catch (error) {
      console.error('세션 확인 실패:', error)
    }
  }

  useEffect(() => {
    checkSession()
  }, []) // 컴포넌트가 마운트될 때 세션 확인

  return (
    <SessionContext.Provider
      value={{ isLogin, setIsLogin, userName, checkSession }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  return useContext(SessionContext)
}
