import './App.css'
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom'
import Home from './pages/user/Home'
import Login from './pages/auth/Login'
import Market from './pages/user/Market'
import Trade from './pages/user/Trade'
import Security from './pages/user/account/Security'
import Dashboard from './pages/user/account/Security'
import Order from './pages/user/account/Order'
import Asset from './pages/user/account/Asset'
import Register from './pages/auth/Register'
import Authentication from './pages/auth/Authentication'
import NotFound from './pages/NotFound'
import MyAccount from './pages/user/MyAccount'
import PrivateRoute from './routers/PrivateRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>

          <Route path="/auth" element={<Authentication />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
          <Route path="/trade" element={<Trade />} />


          <Route path="/my" element={
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

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
