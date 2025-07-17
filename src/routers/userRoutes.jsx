// src/routers/userRoutes.jsx
import { Navigate } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import Home from "../pages/user/Home"
import Market from "../pages/user/Market"
import Trade from "../pages/user/Trade"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import Profile from "../pages/user/Profile"

const userRoutes = [
    {
        path: "/home",
        element: (
            <Home />
        )
    },
    {
        path: "/market",
        element: (
            <Market />
        )
    },
    {
        path: "/trade",
        element: (
            <Trade />
        )
    }, {
        path: "/my/dashboard",
        element: (
            <PrivateRoute>
                <Profile />
            </PrivateRoute>
        )
    },
]

export default userRoutes
