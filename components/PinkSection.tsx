import React from 'react';
const yellowOrnament2 = '/images/yellow_ornament_2.svg';

const PinkSection: React.FC = () => {
  return (
    <div className="w-full h-[40px] md:h-[196px] relative overflow-hidden flex items-center justify-center"
         style={{
           backgroundColor: '#FF008C',
           backgroundImage: `url(${yellowOrnament2})`,
           backgroundRepeat: 'repeat-x',
           backgroundPosition: 'center center',
           backgroundSize: 'auto 100%',
         }}>
    </div>
  );
};

export default PinkSection;
