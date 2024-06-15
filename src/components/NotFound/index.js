import Navbar from '../Navbar'
import './index.css'

const NotFound = () => (
  <>
    <Navbar />
    <div className="main-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="image"
      />
      <h1>Page Not Found</h1>
      <p>We are sorry, the page you requested could not be found</p>
    </div>
  </>
)

export default NotFound
