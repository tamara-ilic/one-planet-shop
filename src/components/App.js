import '../styles/App.css';
import { createClient } from 'contentful';
import { useState, useEffect } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// console.log(process.env.REACT_APP_CONTENTFUL_SPACEID)

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

  // useEffect(() => {
  //   getProducts().then((res) => {
  //     const items = res.items;

  //     const productListings = items.map((item, index) => {
  //       return {
  //         ...item,
  //         file: item.fields.productMedia[0].fields.file,
  //         title: item.fields.title,
  //         // need to loop through all productMedia and get any images (instead of just the first one)
          
  //         // img: item.fields.productMedia.forEach((media) => {
  //         //   <img src={media.fields.file.url} alt='some alt prop'/>
  //         // })

  //         img: item.fields.productMedia[0].fields.file.url
  //       };
  //     });
  //     setProducts(productListings);
  //   });
  // }, []);

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
        products.map((p) => (
          <div key={p.sys.id}>
            <h4 className='product-title'>{p.fields.title}</h4>
            <p>€ {p.fields.price}</p>
            <img className='product-image' src={p.fields.productMedia[0].fields.url} alt='' />
            <div className='product-description'>
              {documentToReactComponents(p.fields.description)}
            </div>
          </div>
        ))
      }
    </div >
  );
}