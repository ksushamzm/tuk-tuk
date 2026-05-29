import React from 'react';
const yellowOrnament = '/images/yellow_ornament.svg';

const ThaiPinkPattern: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div
    className={`w-full h-full bg-[#FF008C] ${className}`}
    style={{
      backgroundImage: `url(${yellowOrnament})`,
      backgroundRepeat: 'repeat-y',
      backgroundPosition: 'center top',
      backgroundSize: '100% auto',
    }}
  />
);

export default ThaiPinkPattern;
