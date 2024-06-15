import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import EachCourseDetails from '../EachCourseDetails'

import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {
    courseItemDetailsData: null,
    currentStatus: statusConstants.initial,
  }

  componentDidMount() {
    this.getDetailsData()
  }

  getDetailsData = async () => {
    this.setState({currentStatus: statusConstants.in_progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      console.log(updatedData)
      this.setState({
        courseItemDetailsData: updatedData,
        currentStatus: statusConstants.success,
      })
    } else {
      this.setState({currentStatus: statusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {courseItemDetailsData} = this.state
    return (
      <div className="detail-container-main">
        <EachCourseDetails courseItemDetailsData={courseItemDetailsData} />
      </div>
    )
  }

  onClickRefreshApi = () => {
    this.getDetailsData()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="button" onClick={this.onClickRefreshApi}>
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" width={50} height={50} />
    </div>
  )

  renderCourseDetailsView = () => {
    const {currentStatus} = this.state
    switch (currentStatus) {
      case statusConstants.in_progress:
        return this.renderLoaderView()
      case statusConstants.failure:
        return this.renderFailureView()
      case statusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <div>{this.renderCourseDetailsView()}</div>
      </>
    )
  }
}
export default CourseItemDetails
