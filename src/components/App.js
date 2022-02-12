import '../styles/App.css'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { useState, useEffect } from 'react'
import LazyLoad from 'react-lazyload'
import CircleLoader from 'react-spinners/CircleLoader'
import { Routes, Route, Link } from "react-router-dom"
import ContactForm from './ContactForm'
import { FaFacebookSquare, FaInstagramSquare, FaYoutube } from "react-icons/fa"


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
    return (
      <>
        <nav className="navbar">
          <Link to="/">
            <img className='logo__leaves' src={require('../assets/one-planet-logo.png')} alt='One Planet logo' />
          </Link>
          <Link to="/blog">Blog</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </>
    )
  }
  /* NAVBAR END*/


  /* HOME START*/
  function Home() {
    return (
      <>
        <h1 className='tagline'>Sustainable products that don't cost the Earth.</h1>
        <p>Shopping sustainably doesn’t have to be expensive.

          By shopping here you will be spending the same or less than you would on equivalent non-sustainable products. The only instance when this might not be the case is when shopping for reusable alternatives to disposable products. Those might cost a bit more upfront but will save you a lot of money in the long run. Here's an example: this lovely graph shows the yearly cost of a lifetime of shaving.</p>
        <Footer />
      </>
    )
  }
  /* HOME END*/


  /* BLOG START*/
  function Blog() {
    return (
      <>
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
        <Footer />
      </>
    )
  }
  /* BLOG END*/


  /* SHOP START*/
  function Shop() {
    return (
      <>
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
        <Footer />
      </>
    )
  }
  /* SHOP END*/

  /* REVIEWS START */
  function Reviews() {
    return (
      <>
        {reviews.map((r) => (
          <div key={reviews.id}>
            <h4 className='product-title'>{r.fields.headline}</h4>
            <p className='product-description'>{r.fields.review}</p>
          </div>
        ))}
        <Footer />
      </>
    )
  }

  /* REVIEWS END */

  /* FOOTER START */
  function Footer() {
    return (
      <div className="footer">
        <a href="#">Impressum</a>
        <a href="#">Privacy Policy</a>

        <a href="#"><h2><FaFacebookSquare /></h2></a>
        <a href="#"><h2><FaInstagramSquare /></h2></a>
        <a href="#"><h2><FaYoutube /></h2></a>
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
    </div >
  );
}