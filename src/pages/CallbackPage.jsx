import React, { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
export const CallbackPage = () => {
  const { hash } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/")
  }, [navigate])

  const params = new URLSearchParams(hash.substring(1))
  sessionStorage.setItem(
    "access_token",
    JSON.stringify(params.get("access_token"))
  )
  return <></>
}
