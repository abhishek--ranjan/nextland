export default function LoadingSkeleton({ type = 'card', count = 1 }) {
  if (type === 'table') {
    return (
      <div className="card">
        <div className="card-body">
          <div className="placeholder-glow">
            <div className="d-flex gap-3 mb-3">
              <span className="placeholder col-2"></span>
              <span className="placeholder col-3"></span>
              <span className="placeholder col-2"></span>
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="d-flex gap-3 mb-2">
                <span className="placeholder col-2"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-3"></span>
                <span className="placeholder col-1"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'card') {
    return (
      <>
        {[...Array(count)].map((_, i) => (
          <div key={i} className="card mb-3">
            <div className="card-body">
              <div className="placeholder-glow">
                <h5 className="card-title placeholder col-6"></h5>
                <p className="card-text">
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-8"></span>
                </p>
                <span className="placeholder col-3 btn btn-primary disabled"></span>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === 'form') {
    return (
      <div className="card">
        <div className="card-body">
          <div className="placeholder-glow">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="mb-3">
                <span className="placeholder col-3 d-block mb-2"></span>
                <span className="placeholder col-12" style={{ height: '38px' }}></span>
              </div>
            ))}
            <span className="placeholder col-2 btn btn-primary disabled mt-3"></span>
          </div>
        </div>
      </div>
    );
  }

  // Default text skeleton
  return (
    <div className="placeholder-glow">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="mb-2">
          <span className="placeholder col-7"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-8"></span>
        </div>
      ))}
    </div>
  );
}
