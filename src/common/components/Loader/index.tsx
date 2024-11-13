import React from 'react';
import './style.css';

interface LoaderProps {
  isLoading: boolean;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading, fullScreen = false }) => {
  if (!isLoading) return null;

  return (
    <div className={`loader-container ${fullScreen ? 'full-screen' : ''}`} aria-live="polite" aria-busy={isLoading}>
      <div className="loader-backdrop"></div>
      <div className="loader-spinner" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;