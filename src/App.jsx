import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './home/Home'
import AcceptedUsers from './usersAccpt/AcceptedUsers'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acceptedUsers" element={<AcceptedUsers />} />
      </Routes>
    </>
  )
}

export default App