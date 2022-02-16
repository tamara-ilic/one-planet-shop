import { createContext, useState, useEffect } from 'react'
import { createClient } from 'contentful'

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
    const [products, setProducts] = useState([])
 
    const [blogposts, setBlogPosts] = useState([])
    const [reviews, setReviews] = useState([]);
  

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
    const getProducts = () => {
        return client.getEntries({
            content_type: 'product'
        });
    };

    const getProduct = (slug) => {
        return client.getEntries({
            content_type: 'product',
            'fields.title[in]': slug
        });
    };
    // PRODUCTS END
  
    // BLOG START  
    const getBlogPosts = () => {
        return client.getEntries({
            content_type: 'blog',
            order: 'sys.createdAt'
        })
    }
    // BLOG END 
  
    // REVIEWS START
    const getReviews = () => {
        return client.getEntries({
            content_type: 'reviews',
            order: 'sys.createdAt'
        })
    }
  // REVIEWS END

  return (
      <ShopContext.Provider value={{getProducts, products, setProducts, getProduct, blogposts, reviews}}>
          {children}
      </ShopContext.Provider>
  )
}

export default ShopContextProvider