'use client'

import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // Log the error for observability (visible in server logs)
  if (typeof window === 'undefined') {
    // eslint-disable-next-line no-console
    console.error('Global application error:', error)
  }

  return (
    <html lang="en">
      <head>
        {/* Vendor CSS */}
        <link rel="stylesheet" href="/assets/css/vendor/aos.css" />
        <link rel="stylesheet" href="/assets/css/vendor/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/vendor/fontawesome.css" />
        <link rel="stylesheet" href="/assets/css/vendor/magnific-popup.css" />
        <link rel="stylesheet" href="/assets/css/vendor/mobile.css" />
        <link rel="stylesheet" href="/assets/css/vendor/sidebar.css" />
        <link rel="stylesheet" href="/assets/css/vendor/slick-slider.css" />
        <link rel="stylesheet" href="/assets/css/vendor/nice-select.css" />
        <link rel="stylesheet" href="/assets/css/vendor/odometer.css" />
        {/* Main CSS */}
        <link rel="stylesheet" href="/assets/css/main.css" />
        <link rel="stylesheet" href="/assets/css/override.css" />
      </head>
      <body>
        <div className="champion-inner-section sp1" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-10 m-auto">
                <div className="contact4-boxarea heading2 text-center" style={{ padding: '32px' }}>
                  <h1 style={{ marginBottom: 12 }}>Something went wrong</h1>
                  <p style={{ opacity: 0.9 }}>An unexpected error occurred while loading this page.</p>
                  {error?.digest && (
                    <p style={{ fontSize: 12, opacity: 0.7 }}>Error ID: {error.digest}</p>
                  )}
                  <div className="space24" />
                  <div className="btn-area1" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button className="vl-btn1" onClick={() => reset()}>
                      Try Again
                    </button>
                    <Link href="/" className="vl-btn1">
                      Go to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}


