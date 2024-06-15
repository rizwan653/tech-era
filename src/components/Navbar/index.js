import {Link} from 'react-router-dom'
import './index.css'

const Navbar = () => (
  <div className="nav-container">
    <Link to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        className="logo"
        alt="website logo"
      />
    </Link>
  </div>
)

export default Navbar
