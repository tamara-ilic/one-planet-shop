import '../styles/footer.css'
import { FaFacebookSquare, FaInstagramSquare, FaYoutube } from "react-icons/fa"

export default function Footer() {
    return (
      <div className="footer">
        <div className="socials">
          <a href="https://m.facebook.com/oneplanetshop.de/" target='_blank' rel='noreferrer'><h2><FaFacebookSquare /></h2></a>
          <a href="https://www.instagram.com/oneplanetshop.de/" target='_blank' rel='noreferrer'><h2><FaInstagramSquare /></h2></a>
          <a href="https://m.youtube.com/channel/UCyxYz7Ec6EuCrIvWb1BpoQw" target='_blank' rel='noreferrer'><h2><FaYoutube /></h2></a>
        </div>
        <div className="legal">
          <a href="#">Impressum</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    )
  }