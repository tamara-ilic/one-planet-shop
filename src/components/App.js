import '../styles/App.css';
import { createClient } from 'contentful';
import { useState, useEffect } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

console.log(process.env.REACT_APP_CONTENTFUL_SPACEID)

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

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => {
      const items = res.items;

      const productListings = items.map((item, index) => {
        return {
          ...item,
          file: item.fields.productMedia[0].fields.file,
          title: item.fields.title,
          img: item.fields.productMedia[0].fields.file.url
        };
      });
      setProducts(productListings);
    });
  }, []);

  return (
    <div className='App'>
      <h1>Sustainable products that don't cost the Earth.</h1>
      {products.map((p) => (
        <>
          <h4>{p.fields.title}</h4>
          <p>€ {p.fields.price}</p>
          <img className='product-image' src={p.img} alt={p.file.title} />
          <>
            {documentToReactComponents(p.fields.description, {
              _renderNode: {
                [BLOCKS.PARAGRAPH]: (node, children) => {
                  return <div className='product-description'>{children}</div>;
                },
                [BLOCKS.HEADING_3]: (node, children) => {
                  return <h3>{children}</h3>;
                },
                [BLOCKS.UL_LIST]: (node, children) => {
                  return <ul>{children}</ul>;
                }
              },
              get renderNode() {
                return this._renderNode;
              },
              set renderNode(value) {
                this._renderNode = value;
              },

              renderMark: {
                [MARKS.CODE]: (text) => <code className='red'>{text}</code>
              },
              renderText: (text) => {
                return text
                  .split('\n')
                  .map((i) => [i, <br />])
                  .flat();
              }
            })}
          </>
        </>
      ))}
    </div>
  );
}
