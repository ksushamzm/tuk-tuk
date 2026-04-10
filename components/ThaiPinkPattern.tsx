
import React from 'react';

const ThaiPinkPattern: React.FC<{ className?: string }> = ({ className = "" }) => {
  // Content cleared per "наполнение розового блока сотри" instruction.
  // Returning a solid magenta block as a brutalist design element.
  return (
    <div className={`w-full h-full bg-thai-magenta relative overflow-hidden ${className}`}>
      {/* Pattern removed */}
    </div>
  );
};

export default ThaiPinkPattern;
