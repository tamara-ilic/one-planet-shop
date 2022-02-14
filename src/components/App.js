import '../styles/App.css'
import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './Home'
import ContactForm from './ContactForm'
import Navbar from './Navbar'
import Products from './Products'
import Blog from './Blog'
import Footer from './Footer'

export default function App() {
  
  // /* Reviews START */
  // const [reviews, setReviews] = useState([]);

  // useEffect(() => {
  //   getReviews().then((res) => {
  //     const items = res.items;

  //     const customerReviews = items.map((item, index) => {
  //       return {
  //         ...item,
  //         headline: item.fields.headline,
  //         review: item.fields.review
  //       }
  //     })
  //     setReviews(customerReviews);
  //   })
  // }, [])
  // /* Reviews END */

  // /* REVIEWS START */
  // function Reviews() {
  //   return (
  //     <main>
  //       {reviews.map((r) => (
  //         <div key={reviews.id}>
  //           <h4 className='product-title'>{r.fields.headline}</h4>
  //           <p className='product-description'>{r.fields.review}</p>
  //         </div>
  //       ))}
  //     </main>
  //   )
  // }

  // /* REVIEWS END */
  
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="shop" element={<Products />} />
        {/* <Route path="reviews" element={<Reviews />} /> */}
        <Route path="contact" element={<ContactForm />} />
      </Routes>
      <Footer />
    </div >
  );
}