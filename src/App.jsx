import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Home from './pages/Home/Home'
import About from './pages/about/About'
import Gallery from './pages/gallery/Gallery'
import Rout_ContactUs from './pages/ContactUs/Rout-ContactUs'

function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Rout_ContactUs />} />
        </Route>
    </Routes>
  )
}

export default App
