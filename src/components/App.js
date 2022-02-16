import '../styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import Blog from './Blog'
import Products from './Products'
import Product from './Product'
import Reviews from './Reviews'
import ContactForm from './ContactForm'
import Footer from './Footer'

export default function App() {

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='blog' element={<Blog />} />
        <Route path='shop' element={<Products />}>
        </Route>
        <Route path='shop/:productTitle' element={<Product />} />
        <Route path='reviews' element={<Reviews />} />
        <Route path='contact' element={<ContactForm />} />
      </Routes>
      <Footer />
    </div >
  );
}