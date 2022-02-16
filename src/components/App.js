import '../styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import ContactForm from './ContactForm'
import Navbar from './Navbar'
import Products from './Products'
import Product from './Product'
import Blog from './Blog'
import Reviews from './Reviews'
import Footer from './Footer'

export default function App() {

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='blog' element={<Blog />} />
        <Route path='shop' element={<Products />}>
          <Route path=':productTitle' element={<Product />} />
        </Route>
        <Route path='reviews' element={<Reviews />} />
        <Route path='contact' element={<ContactForm />} />
      </Routes>
      <Footer />
    </div >
  );
}