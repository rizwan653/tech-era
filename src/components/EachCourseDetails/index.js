import './index.css'

const EachCourseDetails = props => {
  const {courseItemDetailsData} = props
  const {name, imageUrl, description} = courseItemDetailsData
  return (
    <div className="details-flex-container">
      <img src={imageUrl} alt={name} className="detail-image" />
      <div className="texts-container">
        <h1 className="head">{name}</h1>
        <p className="desc">{description}</p>
      </div>
    </div>
  )
}

export default EachCourseDetails
