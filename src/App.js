import React from 'react'
import { Outlet } from 'react-router-dom' 
import HistoryRouter from './router'
export default function App() {
  return (
    <Outlet>
        <HistoryRouter />
    </Outlet>
  )
}
