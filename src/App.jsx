import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './home/Home'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
       


      </Routes>
    </>
  )
}

export default App
