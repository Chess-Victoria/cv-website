export default function DraftBanner() {
  return (
    <div className="alert alert-warning text-center mb-4" role="alert">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <strong>⚠️ DRAFT / IN TESTING</strong>
            <p className="mb-0 mt-2">
              This page is currently in draft/testing phase. Data may be incomplete or subject to change.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
