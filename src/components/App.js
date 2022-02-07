import '../styles/App.css';
import { createClient } from 'contentful';
import { useState, useEffect } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

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

export const getProducts = () => {
  // Retrieve all entries of a space
  return client.getEntries({
    content_type: 'product',
    order: 'sys.createdAt'
  });
};

// BLOG START  
export const getBlogPosts = () => {
  return client.getEntries({
    content_type: 'blog',
    order: 'sys.createdAt'
  })
}
// BLOG END 


export default function App() {
  const [products, setProducts] = useState([]);
  /* Blog START*/
  const [blogposts, setBlogPosts] = useState([])

  useEffect(() => {
    getBlogPosts().then((res) => {
      console.log(res)
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

  useEffect(() => {
    getProducts()
    .then((res) => setProducts(res.items))
    .then((res) => console.log(res))
  }, [])

  useEffect(() => {
    products.length && console.log(products[0].fields.productMedia)
  }, [products])

  const listings = products.map(product => {
    const productImages = product.fields.productMedia.map(image => (<img className='product-image' src={image.fields.file.url} alt='' />));
    const { title, price, description } = product.fields

    return {
      id: product.sys.id,
      title,
      price,
      description,
      productImages
    }
  })

  console.log(listings)

  return (
    <div className='App'>
      <img className='logo__leaves' src={require('../assets/one-planet-logo.png')} alt='One Planet logo' />
      <h1 className='tagline'>Sustainable products that don't cost the Earth.</h1>

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

      {
        listings.map((listing) => (
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
    </div >
  );
}