"use client";

import { useState } from 'react';
import Countdown from '@/components/elements/Countdown';
import Link from 'next/link';

export default function Section2() {
	const [isVisible, setIsVisible] = useState(true);

	return (
		<>
			{isVisible && (
				<div className="others1-section-area">
					<div className="container">
						<div className="row">
							<div className="col-lg-7 col-12 m-auto">
								<div className="timer-btn-area" id="timer-btn-area">
									<span
										className="close-icon"
										onClick={() => setIsVisible(false)}
									>
										✖
									</span>
									<Countdown style={3} />
									<div className="btn-area1">
										<Link className="vl-btn6" href="/pricing-plan">
											<span className="demo">
												Buy A Ticket <img src="/assets/img/icons/arrow2.svg" alt="" />
											</span>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
