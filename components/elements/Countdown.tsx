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

export default function Countdown({ style }: any) {
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
		<>


			{!style && <>
				<div className="timer">
					<div className="time-box">
						<span id="days1" className="time-value">{timeParts.days}</span>
						<br />Days
					</div>
					<div className="space14" />
					<div className="time-box">
						<span id="hours1" className="time-value">{timeParts.hours}</span>
						<br />Hours
					</div>
					<div className="space14" />
					<div className="time-box">
						<span id="minutes1" className="time-value">{timeParts.minutes}</span>
						<br />Minutes
					</div>
					<div className="space14" />
					<div className="time-box" style={{ margin: "0 26px 0 0" }}>
						<span id="seconds1" className="time-value">{timeParts.seconds}</span>
						<br />Seconds
					</div>
				</div>
			</>}


			{style === 1 && <>
				<div className="timer">
					<div className="time-box">
						<span id="days" className="time-value">{timeParts.days} <span>DAYS</span></span>
					</div>
					<div className="time-box">
						<span id="hours" className="time-value">{timeParts.hours} <span>Hours</span></span>
					</div>
					<div className="time-box">
						<span id="minutes" className="time-value">{timeParts.minutes} <span>Minutes</span></span>
					</div>
					<div className="time-box">
						<span id="seconds" className="time-value">{timeParts.seconds} <span>Seconds</span></span>
					</div>
				</div>

			</>}
			{style === 2 && <>
				<div className="row">
					<div className="col-lg-3 col-md-6">
						<div className="cta-counter-box">
							<img src="/assets/img/elements/elements23.png" alt="" className="elements23 keyframe5" />
							<h2><span id="days1" className="time-value">{timeParts.days} <span>DAYS</span></span></h2>
						</div>
						<div className="space50 d-lg-none d-block" />
					</div>
					<div className="col-lg-3 col-md-6">
						<div className="cta-counter-box">
							<img src="/assets/img/elements/elements23.png" alt="" className="elements23 keyframe5" />
							<h2><span id="hours1" className="time-value">{timeParts.hours} <span>Hours</span> </span></h2>
						</div>
						<div className="space50 d-lg-none d-block" />
					</div>
					<div className="col-lg-3 col-md-6">
						<div className="cta-counter-box">
							<img src="/assets/img/elements/elements23.png" alt="" className="elements23 keyframe5" />
							<h2><span id="minutes1" className="time-value">{timeParts.minutes}<span>Minutes</span></span></h2>
						</div>
					</div>
					<div className="col-lg-3 col-md-6">
						<div className="cta-counter-box">
							<img src="/assets/img/elements/elements23.png" alt="" className="elements23 keyframe5" />
							<h2><span id="seconds1" className="time-value">{timeParts.seconds}<span>Seconds</span></span></h2>
						</div>
					</div>
				</div>
			</>}
			{style === 3 && <>
				<div className="timer2">
					<div className="time-box">
						<span id="days" className="time-value">{timeParts.days} <span>DAYS</span></span>
						<br />
					</div>
					<div className="space14" />
					<div className="time-box">
						<span id="hours" className="time-value">{timeParts.hours} <span>Hours</span></span>
						<br />
					</div>
					<div className="space14" />
					<div className="time-box">
						<span id="minutes" className="time-value">{timeParts.minutes} <span>Minutes</span></span>
						<br />
					</div>
					<div className="space14" />
					<div className="time-box" style={{ margin: '0 26px 0 0' }}>
						<span id="seconds" className="time-value">{timeParts.seconds} <span>Seconds</span></span>
						<br />
					</div>
				</div>

			</>}
		</>
	)
}
