import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import Courses from '../Courses'
import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    currentStatus: statusConstants.initial,
    coursesData: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({currentStatus: statusConstants.in_progress})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.courses.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        logoUrl: eachItem.logo_url,
      }))
      this.setState({
        coursesData: updatedData,
        currentStatus: statusConstants.success,
      })
    } else {
      this.setState({currentStatus: statusConstants.failure})
    }
  }

  onClickRefreshApi = () => {
    this.getData()
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

  renderSuccessView = () => {
    const {coursesData} = this.state
    return (
      <>
        <h1 className="heading">Courses</h1>
        <ul className="list-container">
          {coursesData.map(eachCourse => (
            <Courses key={eachCourse.id} coursesDetails={eachCourse} />
          ))}
        </ul>
      </>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" width={50} height={50} />
    </div>
  )

  renderCourses = () => {
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
        <div className="app-container">{this.renderCourses()}</div>
      </>
    )
  }
}

export default Home
