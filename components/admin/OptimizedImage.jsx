import Image from 'next/image';
import { useState } from 'react';

export default function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  priority = false,
  ...props 
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`position-relative ${className}`} style={{ width, height }}>
      {loading && (
        <div 
          className="placeholder-glow position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: '#e9ecef' }}
        >
          <span className="placeholder w-100 h-100"></span>
        </div>
      )}
      
      {error ? (
        <div 
          className="d-flex align-items-center justify-content-center bg-light text-muted"
          style={{ width, height }}
        >
          <i className="bi bi-image" style={{ fontSize: '2rem' }}></i>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoadingComplete={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          priority={priority}
          quality={85}
          {...props}
        />
      )}
    </div>
  );
}
