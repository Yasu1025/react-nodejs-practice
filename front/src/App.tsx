import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AHeader } from './components/layouts/AHeader'
import { AMenu } from './components/layouts/AMenu'
import { AppRouter } from './router/AppRouter'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AHeader />
        <div className="container-fluid">
          <div className="row">
            <AMenu />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <AppRouter />
            </main>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
