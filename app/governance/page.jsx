export default function GovernancePage() {
  return (
    <div className="container" style={{maxWidth: '1140px', padding: '3rem 0'}}>
      <h1 className="mb-4">Governance</h1>
      <p className="lead mb-4">
        Transparent governance and accountability are the cornerstones of our society.
      </p>
      
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">📢 Notices & Circulars</h5>
              <p className="card-text">Official communication from the Managing Committee</p>
              <a href="/notices" className="btn btn-primary">View All Notices</a>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">📅 AGM/GBM</h5>
              <p className="card-text">Annual and General Body Meeting information</p>
              <a href="/governance/agm" className="btn btn-primary">Learn More</a>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">📝 Minutes</h5>
              <p className="card-text">Meeting minutes and resolutions</p>
              <a href="/governance/minutes" className="btn btn-primary">View Minutes</a>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">💰 Financial Information</h5>
              <p className="card-text">Budget, audits, and financial reports</p>
              <a href="/governance/financial" className="btn btn-primary">View Financial Info</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
