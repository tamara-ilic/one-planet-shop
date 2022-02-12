import '../styles/App.css'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { useState, useEffect } from 'react'
import LazyLoad from 'react-lazyload'
import CircleLoader from 'react-spinners/CircleLoader'
import { Routes, Route, Link } from "react-router-dom"


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
      <LazyLoad placeholder={<CircleLoader color='#5DA69E' size='200' />}>
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


  /* NAVBAR START*/
  function Navbar() {
    return (
      <>
        <nav>
          <img className='logo__leaves' src={require('../assets/one-planet-logo.png')} alt='One Planet logo' />
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/shop">Shop</Link>
        </nav>
      </>
    )
  }
  /* NAVBAR END*/


  /* HOME START*/
  function Home() {
    return (
      <>
        <Navbar />
        <h1 className='tagline'>Sustainable products that don't cost the Earth.</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/shop">Shop</Link>
        </nav>
      </>
    )
  }
  /* HOME END*/


  /* BLOG START*/
  function Blog() {
    return (
      <>
        <Navbar />
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
      </>
    )
  }
  /* BLOG END*/


  /* SHOP START*/
  function Shop() {
    return (
      <>
        <Navbar />
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
      </>
    )
  }
  /* SHOP END*/

  /* ----------------------------------------------------------------------------------- */
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="shop" element={<Shop />} />
      </Routes>
    </div >
  );
}