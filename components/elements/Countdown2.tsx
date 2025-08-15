'use client'
import { useEffect, useState } from "react"

const msInSecond = 1000
const msInMinute = 60 * msInSecond
const msInHour = 60 * msInMinute
const msInDay = 24 * msInHour

const getPartsOfTimeDuration = (duration: number) => {
	const days = Math.floor(duration / msInDay)
	const hours = Math.floor((duration % msInDay) / msInHour)
	const minutes = Math.floor((duration % msInHour) / msInMinute)
	const seconds = Math.floor((duration % msInMinute) / msInSecond)

	return { days, hours, minutes, seconds }
}

export default function Countdown2() {
	const [timeDif, setTimeDif] = useState(() => {
		const now = Date.now()
		const endDateTime = new Date()
		endDateTime.setDate(endDateTime.getDate() + 2) // Set end date 2 days from now
		return endDateTime.getTime() - now
	})

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeDif((prev) => {
				const updatedTime = prev - 1000
				if (updatedTime <= 0) {
					clearInterval(interval)
					return 0
				}
				return updatedTime
			})
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	const timeParts = getPartsOfTimeDuration(timeDif)

	return (
		<div className="row">
			<div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-duration={900}>
				<div className="time-box">
					<span id="days1" className="time-value">{timeParts.days}<span>Days</span></span>
				</div>
			</div>
			<div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-duration={1000}>
				<div className="time-box">
					<span id="hours1" className="time-value">{timeParts.hours}<span>Hours</span></span>
				</div>
			</div>
			<div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-duration={1100}>
				<div className="time-box">
					<span id="minutes1" className="time-value">{timeParts.minutes}<span>Minutes</span></span>
				</div>
			</div>
			<div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-duration={1200}>
				<div className="time-box">
					<span id="seconds1" className="time-value">{timeParts.seconds}<span>Seconds</span></span>
				</div>
			</div>
		</div>

	)
}
