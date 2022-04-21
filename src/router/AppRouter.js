import { useState, useEffect } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { CallbackPage } from "../pages/CallbackPage"
import { HomePage } from "../pages/HomePage"
import { LoginPage } from "../pages/LoginPage"

export const AppRouter = () => {
  const [token, setToken] = useState(null)
  const location = useLocation()
  useEffect(() => {
    setToken(sessionStorage.getItem("access_token"))
  }, [location])

  return (
    <Routes>
      <Route path="/callback" element={<CallbackPage />} />
      {token ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  )
}
