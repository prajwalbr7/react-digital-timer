// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimeRunning: false,
  timeElapsedInSeconds: 0,
  timeLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount = () => {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timeLimitInMinutes} = this.state

    if (timeLimitInMinutes > 1) {
      this.setState(prevState => ({
        timeLimitInMinutes: prevState.timeLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timeLimitInMinutes: prevState.timeLimitInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timeLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonDisable = timeElapsedInSeconds > 0

    return (
      <div className="timer-inc-dre-container">
        <p className="para-timer-Limit">Set Timer Limit</p>
        <div className="timer-row-container">
          <button
            className="button-style"
            type="button"
            disabled={isButtonDisable}
            onClick={this.onDecreaseTimerLimitInMinutes}
          >
            <p className="Arthmatic-para-style">-</p>
          </button>
          <p className="para-inc-decre-text-style">{timeLimitInMinutes}</p>
          <button
            className="button-style"
            type="button"
            disabled={isButtonDisable}
            onClick={this.onIncreaseTimerLimitInMinutes}
          >
            <p className="Arthmatic-para-style">+</p>
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimeInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeElapsedInSeconds, timeLimitInMinutes} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({isTimeRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimeRunning, timeElapsedInSeconds, timeLimitInMinutes} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimeRunning) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
  }

  renderTimeController = () => {
    const {isTimeRunning} = this.state
    const StartOrPauseImgUrl = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimeRunning ? 'pause icon' : 'play: icon'
    const buttonToggle = isTimeRunning ? 'Pause' : 'Start'

    return (
      <div className="cont-row-to-start-restart">
        <div className="row-container-to-buttons">
          <button
            className="button-style button-row-cont"
            type="button"
            onClick={this.onStartOrPauseTimer}
          >
            <img
              src={StartOrPauseImgUrl}
              alt={startOrPauseAltText}
              className="img-size-style"
            />
            <p className="para-start-pause-style">{buttonToggle}</p>
          </button>
        </div>
        <div className="row-container-to-buttons">
          <button
            className="button-style button-row-cont"
            type="button"
            onClick={this.onResetTimer}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              alt="reset icon"
              className="img-size-style"
            />
            <p className="para-start-pause-style">Restart</p>
          </button>
        </div>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds = timeLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringfiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringfiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringfiedMinutes}:${stringfiedSeconds}`
  }

  render() {
    const {isTimeRunning} = this.state

    const TimerToggleText = isTimeRunning ? 'Running' : 'Paused'
    return (
      <div className="container1">
        <h1 className="Main-heading-style">Digital Timer</h1>
        <div className="container2">
          <div className="cont-3-timer-bg-img">
            <div className="cont-4-head-para">
              <h1 className="runnning-time-heading-style">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="runnning-time-para-style">{TimerToggleText}</p>
            </div>
          </div>
          <div className="">
            {this.renderTimeController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
