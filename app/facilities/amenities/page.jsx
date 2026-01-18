export default function AmenitiesPage() {
  return (
    <div className="container" style={{maxWidth: '1140px', padding: '3rem 0'}}>
      <h1 className="mb-4">Amenities</h1>
      <p className="lead mb-5">
        Explore the various amenities available to our residents.
      </p>
      
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">🏋️ Gymnasium</h5>
              <p className="card-text">Well-equipped fitness center</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">🏊 Swimming Pool</h5>
              <p className="card-text">Seasonal swimming facility</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">🏛️ Clubhouse</h5>
              <p className="card-text">Community hall for events</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">🎮 Children's Play Area</h5>
              <p className="card-text">Safe play zone for kids</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">🌳 Garden</h5>
              <p className="card-text">Landscaped green spaces</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">🚗 Parking</h5>
              <p className="card-text">Covered and open parking</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
