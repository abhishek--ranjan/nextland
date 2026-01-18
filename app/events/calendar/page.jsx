export default function EventCalendarPage() {
  return (
    <div className="container" style={{maxWidth: '1140px', padding: '3rem 0'}}>
      <h1 className="mb-4">Event Calendar</h1>
      <p className="lead mb-5">
        View all upcoming events and celebrations in our society.
      </p>
      
      <div className="alert alert-info">
        <strong>Stay Updated:</strong> Check this calendar regularly for the latest event announcements.
      </div>
      
      <div className="mt-4">
        <a href="/events" className="btn btn-primary">View All Events</a>
      </div>
    </div>
  );
}
