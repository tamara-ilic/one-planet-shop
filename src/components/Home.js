import { NavLink } from 'react-router-dom'

export default function Home() {
  return (
    <main>
      <h1 className='tagline'>Sustainable products that don't cost the Earth.</h1>
      <p>Hey, so you want to shop responsibly and on a budget? We offer products that are both sustainable and affordable - it shouldn’t be a trade off.</p>
      <img className='shop-symbols' src={require('../assets/one-planet-cruelty-free-conscious-plastic-free.png')} alt='cruelty-free, conscious, plastic-free symbols'></img>
      <div>
        <NavLink to='/shop'>
          <button className='button-shop'>SHOP NOW</button>
        </NavLink>
      </div>
    </main>
    )
  }