import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home/Home.tsx'
import Login from './pages/Login/Login.tsx'
import TableList from './pages/TableList/TableList.tsx'

import MainLayout from './layouts/MainLayout.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<TableList />} />
      </Route>
    </Routes>
  </BrowserRouter>
)