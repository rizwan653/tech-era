import {Link} from 'react-router-dom'
import './index.css'

const Courses = props => {
  const {coursesDetails} = props
  const {id, name, logoUrl} = coursesDetails
  return (
    <Link className="link" to={`/courses/${id}`}>
      <li className="each-list">
        <img className="courses-logo" src={logoUrl} alt={name} />
        <p className="name">{name}</p>
      </li>
    </Link>
  )
}

export default Courses
