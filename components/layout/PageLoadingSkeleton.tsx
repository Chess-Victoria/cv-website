export default function PageLoadingSkeleton() {
  return (
    <div className="schedule-section-area sp10">
      <div className="container">
        <div className="row">
          <div className="col-lg-11 m-auto">
            <div className="text-center">
              <div className="placeholder-glow">
                <span className="placeholder col-6" style={{ height: '2rem' }}></span>
              </div>
              <div className="space20" />
              <div className="placeholder-glow">
                <span className="placeholder col-8" style={{ height: '1.5rem' }}></span>
              </div>
              <div className="space20" />
              <div className="placeholder-glow">
                <span className="placeholder col-4" style={{ height: '1rem' }}></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
