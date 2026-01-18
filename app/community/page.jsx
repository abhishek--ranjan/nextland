export default function CommunityPage() {
  return (
    <div className="container" style={{maxWidth: '1140px', padding: '3rem 0'}}>
      <h1 className="mb-4">Community</h1>
      <p className="lead mb-4">
        Bringing our society members together through events, activities, and initiatives.
      </p>
      
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">🎉 Events & Celebrations</h5>
              <p className="card-text">Festivals, cultural programs, and community gatherings</p>
              <a href="/events" className="btn btn-primary">View Events</a>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">📅 Event Calendar</h5>
              <p className="card-text">Upcoming community events and activities</p>
              <a href="/events/calendar" className="btn btn-primary">View Calendar</a>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">🌱 Sustainability</h5>
              <p className="card-text">Green initiatives and environmental programs</p>
              <a href="/community/sustainability" className="btn btn-primary">Learn More</a>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">📸 Photo Gallery</h5>
              <p className="card-text">Moments captured from our community events</p>
              <a href="/photo-gallery" className="btn btn-primary">View Gallery</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
