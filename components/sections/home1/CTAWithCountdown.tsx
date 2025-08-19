import Link from 'next/link'
import Countdown from '@/components/elements/Countdown'

export interface CTALinkItem {
  name: string
  href: string
  icon?: string
}

export interface CTAWithCountdownProps {
  className?: string
  buttonLabel?: string
  buttonHref?: string
  links?: CTALinkItem[]
  targetDate?: string
}

export default function CTAWithCountdown({
  className,
  buttonLabel = 'Contact Us',
  buttonHref = '/contact',
  links = [],
  targetDate,
}: CTAWithCountdownProps) {
  return (
    <div className={`cta1-section-area d-lg-block d-block ${className || ''}`.trim()}>
      <div className="container">
        <div className="row">
          <div className="col-lg-10 m-auto">
            <div className="cta1-main-boxarea">
              <div className="timer-btn-area">
                {targetDate && <Countdown targetDate={targetDate} />}
                <div className="btn-area1">
                  <Link href={buttonHref} className="vl-btn1">{buttonLabel}</Link>
                </div>
              </div>
              {links.length > 0 && (
                <ul>
                  {links.map((l, idx) => (
                    <li key={idx} className={idx === links.length - 1 ? 'm-0' : ''}>
                      <Link href={l.href}>
                        {l.icon && <img src={l.icon} alt="" />}
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


