export default function HelpdeskPage() {
  return (
    <div className="container" style={{maxWidth: '1140px', padding: '3rem 0'}}>
      <h1 className="mb-4">Helpdesk</h1>
      <p className="lead mb-5">
        Submit complaints, requests, and queries.
      </p>
      
      <div className="row g-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Submit a Request</h5>
              <p className="card-text mb-4">
                For complaints and service requests, please contact the office during working hours 
                or use the emergency contact for urgent matters.
              </p>
              <a href="/contact" className="btn btn-primary">Contact Office</a>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">📞 Call Helpdesk</h5>
              <p className="card-text">Available during office hours</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">📧 Email Support</h5>
              <p className="card-text">Response within 24-48 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
