import './App.css'
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom'
import Home from './pages/user/Home'
import Login from './pages/auth/Login'
import Market from './pages/user/Market'
import Trade from './pages/user/Trade'
import Security from './pages/user/account/Security'
import Dashboard from './pages/user/account/Dashboard'
import Order from './pages/user/account/Order'
import Asset from './pages/user/account/Asset'
import Register from './pages/auth/Register'
import Authentication from './pages/auth/Authentication'
import NotFound from './pages/NotFound'
import MyAccount from './pages/user/MyAccount'
import PrivateRoute from './routers/PrivateRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Body from './layouts/user/Body'
import { AuthProvider } from './contexts/AuthContext'
import TwoFactorAuthenticate from './pages/user/account/TwoFactorAuthenticate'
import { Toaster } from 'react-hot-toast'

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>

        <BrowserRouter>
          <Routes>

            <Route path="/auth" element={<Authentication />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            <Route path="/" element={<Body />}>
              <Route index element={<Home />} />
              <Route path="market" element={<Market />} />
              <Route path="trade" element={<Trade />} />
              <Route path="my/security/2fa" element={<PrivateRoute><TwoFactorAuthenticate /></PrivateRoute>} />

              <Route path="my" element={
                <PrivateRoute>
                  <MyAccount />
                </PrivateRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="security" element={<Security />} />
                <Route path="orders" element={<Order />} />
                <Route path="asset" element={<Asset />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-right"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 5000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#ECECEC",
              color: "black",
            },
          }}
        />{" "}
      </AuthProvider>

    </QueryClientProvider>
  )
}

export default App
