export default function UtilitiesPage() {
  return (
    <div className="container" style={{maxWidth: '1140px', padding: '3rem 0'}}>
      <h1 className="mb-4">Utilities</h1>
      <p className="lead mb-5">
        Information about essential utilities and services.
      </p>
      
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">💧 Water Supply</h5>
              <p className="card-text">24x7 water supply with overhead tanks</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">⚡ Power Backup</h5>
              <p className="card-text">DG backup for common areas</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">🗑️ Waste Management</h5>
              <p className="card-text">Daily garbage collection and disposal</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">🔒 Security</h5>
              <p className="card-text">24x7 security personnel and CCTV</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
