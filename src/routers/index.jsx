import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import Home from "../pages/user/Home"
import userRoutes from "./userRoutes"

const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> }
]

const routes = [
  ...publicRoutes,
  ...userRoutes,
  { path: "*", element: <h1>404 Not Found</h1> }
]

export default routes