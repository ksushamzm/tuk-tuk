import React from 'react';
const yellowOrnament = '/images/yellow_ornament.svg';

interface YellowSectionProps {
  vertical?: boolean;
}

const YellowSection: React.FC<YellowSectionProps> = ({ vertical }) => {
  if (vertical) {
    return (
      <div 
        className="w-full h-full bg-thai-yellow"
        style={{
          backgroundImage: `url(${yellowOrnament})`,
          backgroundRepeat: 'repeat-y',
          backgroundPosition: 'center top',
          backgroundSize: '100% auto'
        }}
      />
    );
  }

  return (
    <div 
      className="w-full h-[76px] md:h-[142px] bg-thai-yellow"
      style={{
        backgroundImage: `url(${yellowOrnament})`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'left center',
        backgroundSize: 'auto 100%'
      }}
    />
  );
};

export default YellowSection;
