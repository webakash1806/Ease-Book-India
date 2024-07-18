import React from 'react'
import HomeLayout from './Layout/HomeLayout'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <HomeLayout>
      <Routes>
        <Route path='/' element={HomeLayout} />
      </Routes>
    </HomeLayout>
  )
}

export default App
