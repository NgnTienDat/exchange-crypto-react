import { useState } from "react"
import { Navigate } from "react-router-dom"



export default function PrivateRoute({ children }) {
//   const { user } = useAuth()
  const user  = false
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}