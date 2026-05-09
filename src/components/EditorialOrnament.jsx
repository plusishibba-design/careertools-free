import React from 'react';

function EditorialOrnament({ className = '' }) {
  return (
    <div className={`editorial-ornament ${className}`} aria-hidden="true">
      <img src="/images/ornament-divider.png" alt="" loading="lazy" />
    </div>
  );
}

export default EditorialOrnament;
