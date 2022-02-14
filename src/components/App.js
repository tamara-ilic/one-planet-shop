import '../styles/App.css'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { useState, useEffect } from 'react'
import LazyLoad from 'react-lazyload'
import CircleLoader from 'react-spinners/CircleLoader'
import { Routes, Route, NavLink } from "react-router-dom"
import ContactForm from './ContactForm'
import { FaFacebookSquare, FaInstagramSquare, FaYoutube } from "react-icons/fa"
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'

// Main configuration
const config = {
  spaceID: process.env.REACT_APP_CONTENTFUL_SPACEID,
  deliveryToken: process.env.REACT_APP_CONTENTFUL_DELIVERY_TOKEN
};

// Create client
const client = createClient({
  space: config.spaceID,
  accessToken: config.deliveryToken
});

// PRODUCTS START
export const getProducts = () => {
  return client.getEntries({
    content_type: 'product',
    order: 'sys.createdAt'
  });
};
// PRODUCTS END

// BLOG START  
export const getBlogPosts = () => {
  return client.getEntries({
    content_type: 'blog',
    order: 'sys.createdAt'
  })
}
// BLOG END 

// REVIEWS START
export const getReviews = () => {
  return client.getEntries({
    content_type: 'reviews',
    order: 'sys.createdAt'
  })
}
// REVIEWS END

export default function App() {

  /* Blog START*/
  const [blogposts, setBlogPosts] = useState([])

  useEffect(() => {
    getBlogPosts().then((res) => {
      const items = res.items

      const blogListings = items.map((item, index) => {
        return {
          ...item,
          title: item.fields.blogTitle,
          blogPicture: item?.fields?.blogPicture?.fields.file.url,
          text: item.fields.blogText
        }
      })
      setBlogPosts(blogListings)
    })
  }, [])
  /* Blog END*/

  /* Products START */
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.items))
  }, [])

  useEffect(() => {
    products.length && console.log(products[0].fields.productMedia)
  }, [products])

  const listings = products.map(product => {
    const productImages = product.fields.productMedia.map(image => (
      <LazyLoad key={image.sys.id} placeholder={<CircleLoader color='#5DA69E' size='200px' />}>
        <img className='product-image' src={image.fields.file.url} alt={image.fields.title} loading='lazy' />
      </LazyLoad>
    )
    );
    const { title, price, description } = product.fields

    return {
      id: product.sys.id,
      title,
      price,
      description,
      productImages
    }
  })
  /* Products END*/

  /* Reviews START */
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then((res) => {
      const items = res.items;

      const customerReviews = items.map((item, index) => {
        return {
          ...item,
          headline: item.fields.headline,
          review: item.fields.review
        }
      })
      setReviews(customerReviews);
    })
  }, [])
  /* Reviews END */

  /* NAVBAR START*/
  function Navbar() {
    const [navbarOpen, setNavbarOpen] = useState(false)

    const handleNavbarToggle = () => {
      setNavbarOpen(previous => !previous)
    }

    const closeMenu = () => {
      setNavbarOpen(false)
    }

    return (
      <header >
        <NavLink to="/" className={'logo'}>
          <img className='logo__leaves' src={require('../assets/one-planet-logo.png')} alt='One Planet logo' />
        </NavLink>
        <nav>
          <button onClick={handleNavbarToggle}>{navbarOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}</button>
          <div className={`menuNav ${navbarOpen ? "showMenu" : ""}`}>
            <NavLink onClick={() => closeMenu()} to="/blog"  >Blog</NavLink>
            <NavLink onClick={() => closeMenu()} to="/shop" >Shop</NavLink>
            <NavLink onClick={() => closeMenu()} to="/reviews" >Reviews</NavLink>
            <NavLink onClick={() => closeMenu()} to="/contact" >Contact</NavLink>
          </div>
        </nav>
      </header>
    )
  }
  /* NAVBAR END*/


  /* HOME START*/
  function Home() {
    return (
      <main>
        <h1 className='tagline'>Sustainable products that don't cost the Earth.</h1>
        <p>Shopping sustainably doesn’t have to be expensive.</p>

        <p>
          By shopping here you will be spending the same or less than you would on equivalent non-sustainable products. The only instance when this might not be the case is when shopping for reusable alternatives to disposable products. Those might cost a bit more upfront but will save you a lot of money in the long run. 
          
        </p>Here's an example: this lovely graph shows the yearly cost of a lifetime of shaving.
      </main>
    )
  }
  /* HOME END*/


  /* BLOG START*/
  function Blog() {
    return (
      <main>
        {blogposts.map((b) => (
          <div key={b.sys.id} >
            <h4 className='product-title'>{b.fields.blogTitle}</h4>
            <img className='product-image' src={b.blogPicture} />
            <div className='product-description'>
              {documentToReactComponents(b.fields.blogText)}
            </div>
          </div>
        ))
        }
      </main>
    )
  }
  /* BLOG END*/


  /* SHOP START*/
  function Shop() {
    return (
      <main>
        {listings.map((listing) => (
          <div key={listing.id}>
            <h4 className='product-title'>{listing.title}</h4>
            <p>€ {listing.price}</p>
            {listing.productImages}
            <div className='product-description'>
              {documentToReactComponents(listing.description)}
            </div>
          </div>
        ))
        }
      </main>
    )
  }
  /* SHOP END*/

  /* REVIEWS START */
  function Reviews() {
    return (
      <main>
        {reviews.map((r) => (
          <div key={reviews.id}>
            <h4 className='product-title'>{r.fields.headline}</h4>
            <p className='product-description'>{r.fields.review}</p>
          </div>
        ))}
      </main>
    )
  }

  /* REVIEWS END */

  /* FOOTER START */
  function Footer() {
    return (
      <div className="footer">
        <a href="#">Impressum</a>
        <a href="#">Privacy Policy</a>

        <a href="https://m.facebook.com/oneplanetshop.de/" target='_blank' rel='noreferrer'><h2><FaFacebookSquare /></h2></a>
        <a href="https://www.instagram.com/oneplanetshop.de/" target='_blank' rel='noreferrer'><h2><FaInstagramSquare /></h2></a>
        <a href="https://m.youtube.com/channel/UCyxYz7Ec6EuCrIvWb1BpoQw" target='_blank' rel='noreferrer'><h2><FaYoutube /></h2></a>
      </div>
    )
  }

  /* REVIEWS END */


  /* ----------------------------------------------------------------------------------- */
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="shop" element={<Shop />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="contact" element={<ContactForm />} />
      </Routes>
      <Footer />
    </div >
  );
}