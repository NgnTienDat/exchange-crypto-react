import './App.css'
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom'
import Home from './pages/user/Home'
import Login from './pages/auth/Login'
import Market from './pages/user/Market'
import Trade from './pages/user/Trade'
import Security from './pages/user/account/Security'
import Dashboard from './pages/user/account/Dashboard'
import Asset from './pages/user/account/Asset'
import Register from './pages/auth/Register'
import Authentication from './pages/auth/Authentication'
import NotFound from './pages/NotFound'
import MyAccount from './pages/user/MyAccount'
import PrivateRoute from './routers/PrivateRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Body from './layouts/user/Body'
import { AuthProvider } from './contexts/AuthContext'
import TwoFactorAuthenticate from './pages/user/account/TwoFactorAuthenticate'
import { Toaster } from 'react-hot-toast'
import { SocketProvider } from './hooks/useSocket'
import BuyCrypto from './pages/user/BuyCrypto'
import MarketDataProvider from './contexts/MarketDataProvider'
import OrderHistory from './pages/user/account/OrderHistory'
import SignUp from './pages/auth/SignUp'
import VerifyEmail from './pages/auth/VerifyEmail'
import CreatePassword from './pages/auth/CreatePassword'
import AdminUI from './pages/admin/AdminUI'
import Forbidden from './pages/Forbidden'
import AdminRoute from './pages/admin/AdminRoute'
import CallBackOAuth from './pages/auth/CallBackOAuth'

function App() {

  const queryClient = new QueryClient()


  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>

        <BrowserRouter>
          <Routes>

            <Route path="/auth" element={<Authentication />}>
              <Route path="login" element={<Login />} />
              <Route path="login/callback" element={<CallBackOAuth />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="verify" element={<VerifyEmail />} />
              <Route path="password" element={<CreatePassword />} />
            </Route>

            <Route path="/" element={
              <SocketProvider>
                <MarketDataProvider />
                <Body />
              </SocketProvider>
            }>
              <Route index element={<Home />} />
              <Route path="crypto/buy" element={<BuyCrypto />} />
              <Route path="market" element={<Market />} />
              <Route path="trade/:productId" element={<Trade />} />
              <Route path="my/security/2fa" element={<PrivateRoute><TwoFactorAuthenticate /></PrivateRoute>} />

              <Route path="my" element={
                <PrivateRoute>
                  <MyAccount />
                </PrivateRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="security" element={<Security />} />
                <Route path="orders/history" element={<OrderHistory />} />
                <Route path="asset" element={<Asset />} />
              </Route>

              {/* <Route path="admin/dashboard" element={<AdminUI />} /> */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <AdminUI />
                  </AdminRoute>
                }
              />




              <Route path="*" element={<NotFound />} />
              <Route path="/not-permission" element={<Forbidden />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster
          position="bottom-left"
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
