import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing } from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Link from './pages/Link'
import RedirectLink from './pages/Redirect-Link'
import AppLayout from './layouts/AppLayout'
import UrlProvider from './context'
import RequireAuth from './components/requireAuth'

function App() {

  return (
    <UrlProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path='/' element={<Landing />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/:id' element={<RedirectLink />} />
            <Route element={<RequireAuth />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/link/:id' element={<Link />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </UrlProvider>
  )
}

export default App
