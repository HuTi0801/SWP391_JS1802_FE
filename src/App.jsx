import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from "./components/header/Header.jsx"
import Home from "./pages/home/Home.jsx"
import Functionbar from './components/functionbar/Functionbar.jsx'
function App() {


  return (
    <>

      <Header />
      <Functionbar />

      <Routes>
        <Route path='/' element={<Home />} />


      </Routes>


    </>
  )
}


export default App