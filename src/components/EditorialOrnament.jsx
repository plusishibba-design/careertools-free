import React from 'react';

function EditorialOrnament({ className = '' }) {
  return (
    <div className={`editorial-ornament ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 16" width="200" height="16" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="8" x2="86" y2="8" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
        <path d="M100 2 L106 8 L100 14 L94 8 Z" fill="currentColor" opacity="0.7" />
        <line x1="114" y1="8" x2="200" y2="8" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
      </svg>
    </div>
  );
}

export default EditorialOrnament;
