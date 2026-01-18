export default function SustainabilityPage() {
  return (
    <div className="container" style={{maxWidth: '1140px', padding: '3rem 0'}}>
      <h1 className="mb-4">Sustainability Initiatives</h1>
      <p className="lead mb-5">
        Our commitment to environmental sustainability and green living.
      </p>
      
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">♻️ Waste Management</h5>
              <p className="card-text">Segregation, recycling, and composting programs</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">🌿 Green Spaces</h5>
              <p className="card-text">Maintaining gardens and tree plantation drives</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">💡 Energy Conservation</h5>
              <p className="card-text">Solar panels and energy-saving initiatives</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
