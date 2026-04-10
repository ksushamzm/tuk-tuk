import React from 'react';
import { Link } from 'react-router-dom';
import { CategoryData } from '../data/categoriesData';
import ThaiMountainPattern from './ThaiMountainPattern';
import ThaiPatternVertical from './ThaiPatternVertical';
import GreenSection from './GreenSection';
import BlueSection from './BlueSection';
import YellowSection from './YellowSection';

interface Props {
  data: CategoryData;
}

const CategoryTemplate3: React.FC<Props> = ({ data }) => {
  const { title, starIcon, blocks } = data;

  const fixHangingPrepositions = (text: string) => {
    if (!text) return '';
    return text.replace(/\b(в|и|к|о|с|у|а|от|из|за|по|на|до|об|со|во|ко|но|бы|ли|же|да)\s+/gi, '$1\u00A0');
  };

  const ArrowIcon = () => (
    <svg viewBox="0 0 42 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[24px] md:w-[3.5vw] h-auto">
      <path d="M41.7071 8.70711C42.0976 8.31658 42.0976 7.68342 41.7071 7.29289L35.3431 0.928932C34.9526 0.538408 34.3195 0.538408 33.9289 0.928932C33.5384 1.31946 33.5384 1.95262 33.9289 2.34315L39.5858 8L33.9289 13.6569C33.5384 14.0474 33.5384 14.6805 33.9289 15.0711C34.3195 15.4616 34.9526 15.4616 35.3431 15.0711L41.7071 8.70711ZM0 9H41V7H0V9Z" fill="black" />
    </svg>
  );

  const TestLogo = () => (
    <svg width="146" height="53" viewBox="0 0 146 53" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] scale-100 md:scale-120 origin-left">
      <path d="M143.902 1.59912L143.698 2.771L142.537 9.42627L142.393 10.2544H130.112L124.271 44.0044L124.127 44.8335H113.799L114.002 43.6626L114.205 42.4917L119.807 10.2544H107.709L107.913 9.08252L109.074 2.42725L109.219 1.59912H143.902Z" fill="white" stroke="black" strokeWidth="2" />
      <path d="M91.501 1.00488L91.5 1.00586C94.6099 1.06494 97.3063 1.73392 99.5439 3.06543H99.5449C101.786 4.36961 103.512 6.19953 104.712 8.5332H104.714C105.927 10.8377 106.587 13.5076 106.725 16.5156L106.772 17.5645L105.723 17.5605L97.4814 17.5322L96.4727 17.5293L96.4844 16.5205C96.5022 15.0781 96.3235 13.8561 95.9727 12.8369L95.9697 12.8271L95.9668 12.8184C95.6519 11.8422 95.1192 11.126 94.374 10.6191L94.2217 10.5176C93.4949 10.0599 92.4458 9.76534 90.9932 9.71582V9.71484C89.3333 9.66347 87.9979 9.9942 86.9336 10.6455C85.8037 11.3369 84.8639 12.2652 84.1113 13.4453C83.3506 14.6677 82.7457 16.0098 82.2988 17.4756C81.859 18.98 81.5304 20.4526 81.3115 21.8936L80.918 24.8096L80.9189 24.8105C80.772 26.0047 80.67 27.3358 80.6143 28.8047V28.8057C80.5607 30.1976 80.6764 31.5169 80.958 32.7666C81.2233 33.9439 81.7262 34.8847 82.4492 35.625C83.0382 36.2118 83.9631 36.6128 85.3643 36.7031L85.6514 36.7168L86.2305 36.7227C87.5505 36.7037 88.6586 36.4591 89.5781 36.0205L89.583 36.0176C90.6637 35.5099 91.5341 34.7623 92.208 33.7598L92.2148 33.751C92.9236 32.7216 93.4544 31.4663 93.79 29.9648L93.79 29.9648L93.9619 29.1943L94.752 29.1826L102.852 29.0693L103.992 29.0537L103.858 30.1865C103.481 33.3869 102.39 36.1692 100.566 38.5L100.567 38.501C98.7839 40.7855 96.5362 42.5296 93.8408 43.7275L93.835 43.7305C91.1447 44.9061 88.2346 45.4586 85.1182 45.3994H85.1162C82.2316 45.3401 79.7315 44.7258 77.6621 43.5049L77.6553 43.501V43.5C75.6225 42.2801 74.0176 40.6463 72.8555 38.6074C71.7129 36.6029 70.9668 34.3778 70.6104 31.9424C70.2569 29.5274 70.2382 27.0576 70.5508 24.5371L70.5527 24.5234L70.9492 21.6631L70.9502 21.6543C71.3399 19.0043 72.0514 16.4412 73.084 13.9668L73.0869 13.9609L73.2891 13.4971C74.3205 11.1926 75.64 9.12197 77.249 7.29102C78.9807 5.32056 81.0342 3.76616 83.4023 2.63184C85.8091 1.47901 88.5166 0.94559 91.501 1.00488Z" fill="white" stroke="black" strokeWidth="2" />
      <path d="M72.9033 1.59912L72.6992 2.771L71.5381 9.42627L71.3936 10.2544H52.8486L51.4346 18.3931H67.2686L67.0635 19.5659L65.9307 26.0229L65.7852 26.8501H49.9648L48.3398 36.2065H66.957L66.752 37.3794L65.5908 44.0063L65.4453 44.8335H36.5137L36.7158 43.6626L43.8525 2.42822L43.9961 1.59912H72.9033Z" fill="white" stroke="black" strokeWidth="2" />
      <path d="M41.3828 1.59912L41.1787 2.771L40.0176 9.42627L39.873 10.2544H27.5928L21.751 44.0044L21.6074 44.8335H11.2793L11.4824 43.6626L17.2871 10.2544H5.18945L5.39355 9.08252L6.55469 2.42725L6.69922 1.59912H41.3828Z" fill="white" stroke="black" strokeWidth="2" />
    </svg>
  );

  const Star = ({ className }: { className?: string }) => (
    <img src={starIcon} alt="star" className={`absolute w-[87px] h-[87px] md:w-[140px] md:h-[140px] z-10 pointer-events-none drop-shadow-md object-contain ${className}`} />
  );

  return (
    <div className="w-full bg-white font-roboto overflow-hidden">
      {/* Title Header (Desktop Only) */}
      <div className="hidden md:block py-16 border-b-2 border-black text-center">
        <h1 className="text-5xl md:text-[4vw] font-medium uppercase tracking-tighter italic leading-none">{fixHangingPrepositions(title)}</h1>
      </div>

      {/* --- MOBILE ONLY BLOCKS --- */}

      {/* Mobile Row 1: Mountain Left / Empty Right (blocks[2]) */}
      <Link to={`/article/${blocks[2].id || data.id}`} className="md:hidden flex h-[304px] border-b-2 border-black hover:bg-thai-yellow/5 transition-colors group">
        <div className="w-1/2 relative overflow-hidden flex flex-col justify-end border-r-2 border-black bg-white">
          <Star className="top-2 right-2" />
          <div className="absolute inset-0 flex items-end">
            <ThaiMountainPattern className="w-full h-auto" />
          </div>
          <div className="relative z-10 p-[14px] pb-8 flex flex-col items-center">
            <p className="text-[14px] font-normal italic leading-tight text-center mb-4">
              {fixHangingPrepositions(blocks[2].title)}
            </p>
            <div className="self-end mr-2 group-hover:translate-x-2 transition-transform"><ArrowIcon /></div>
          </div>
        </div>
        <div className="w-1/2 bg-white flex items-start justify-end p-2 px-4"></div>
      </Link>

      {/* Mobile Row 2: Block 1 Title + Block 3 Text (50/50 Split no center border) */}
      <Link to={`/article/${blocks[1].id || data.id}`} className="md:hidden p-[14px] border-b-2 border-black bg-white flex flex-row relative min-h-[200px] hover:bg-thai-yellow/5 transition-colors group">
        <Star className="bottom-2 left-2" />
        <div className="w-1/2 pr-2">
          <h2 className="text-[24px] font-medium uppercase italic leading-[0.9]">
            {fixHangingPrepositions(blocks[1].title)}
          </h2>
        </div>
        <div className="w-1/2 flex flex-col justify-end">
          <p className="text-[14px] font-normal italic leading-[1.3] text-black mb-4 w-full">
            {fixHangingPrepositions(blocks[3].text || '')}
          </p>
          <div className="flex justify-end group-hover:translate-x-2 transition-transform">
            <ArrowIcon />
          </div>
        </div>
      </Link>

      {/* Mobile Row 3: Empty Left / Mountain Right (blocks[5]) */}
      <div className="md:hidden flex h-[304px] border-b-2 border-black">
        <div className="w-1/2 border-r-2 border-black bg-white"></div>
        <Link to={`/article/${blocks[5].id || data.id}`} className="w-1/2 relative overflow-hidden flex flex-col justify-end bg-white hover:bg-thai-yellow/5 transition-colors group">
          <Star className="top-2 right-2" />
          <div className="absolute inset-x-0 bottom-0 flex items-end">
            <ThaiMountainPattern className="w-full h-auto" />
          </div>
          <div className="relative z-10 p-[14px] pb-8 flex flex-col items-center">
            <p className="text-[14px] font-normal italic leading-tight text-center mb-4">
              {fixHangingPrepositions(blocks[5].title)}
            </p>
            <div className="self-end mr-2 group-hover:translate-x-2 transition-transform"><ArrowIcon /></div>
          </div>
        </Link>
      </div>

      {/* Mobile Row 4: Photo + Caption (blocks[4]) */}
      <Link to={`/article/${blocks[4].id || data.id}`} className="md:hidden flex flex-col border-b-2 border-black hover:bg-thai-yellow/5 transition-colors group">
        <div className="relative h-[300px]">
          <Star className="top-4 right-4" />
          <img src={blocks[4].image} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="p-[14px] h-[68px] flex items-center justify-between border-t-2 border-black bg-white">
          <p className="text-[14px] font-normal italic leading-tight">
            {fixHangingPrepositions(blocks[4].title)}
          </p>
          <div className="group-hover:translate-x-2 transition-transform">
            <ArrowIcon />
          </div>
        </div>
      </Link>

      {/* Mobile Row 5: Yellow Section */}
      <div className="md:hidden h-[76px] border-b-2 border-black overflow-hidden relative">
        <YellowSection />
      </div>

      {/* Mobile Row 6: TEST Block (blocks[0]) */}
      <div className="md:hidden flex h-[220px] border-b-2 border-black relative">
        <Star className="top-2 left-1/2 -translate-x-1/2 z-20" />
        <Link to={`/article/${blocks[0].id || data.id}`} className="w-1/2 p-[14px] flex flex-col justify-between border-r-2 border-black relative bg-white hover:bg-thai-yellow/5 transition-colors group">
          <div className="flex flex-col scale-50 origin-left">
            <TestLogo />
          </div>
          <div className="flex flex-col items-start mt-4">
            <div className="mb-2 group-hover:translate-x-2 transition-transform"><ArrowIcon /></div>
            <p className="text-[14px] font-normal italic leading-tight max-w-[120px]">
              {fixHangingPrepositions(blocks[0].title)}
            </p>
          </div>
        </Link>
        <div className="w-1/2 overflow-hidden relative">
          <img src={blocks[1].image} className="w-full h-full object-cover" alt="" />
        </div>
      </div>

      {/* --- DESKTOP ONLY BLOCKS --- */}

      {/* Row 1: Photo + Title/Text (535px) */}
      <div className="hidden md:flex flex-col md:flex-row border-b-2 border-black relative md:h-[37.1vw]">
        <div className="md:w-[33.47%] border-b-2 md:border-b-0 md:border-r-2 border-black relative overflow-hidden h-[300px] md:h-full">
          <Star className="top-4 right-4" />
          <div className="w-full h-full overflow-hidden">
            <img src={blocks[1].image} className="w-full h-full object-cover" alt="" />
          </div>
        </div>
        <Link to={`/article/${blocks[1].id || data.id}`} className="md:w-[66.53%] p-[14px] md:p-[3vw] flex flex-col md:flex-row relative overflow-hidden bg-white hover:bg-thai-yellow/5 transition-colors group cursor-pointer">
          <div className="md:w-1/2 flex flex-col justify-between relative pb-4 md:pb-0">
            <h2 className="text-[24px] md:text-[4vw] font-medium uppercase italic leading-[0.9] mb-4 md:mb-6 pr-4">
              {fixHangingPrepositions(blocks[1].title).split(' ').map((word, i) => (
                <React.Fragment key={i}>{word} </React.Fragment>
              ))}
            </h2>
          </div>
          <div className="md:w-1/2 flex flex-col justify-start items-end relative p-[14px] md:p-[1.25vw] h-full">
            <div className="w-full flex-1 max-h-[75%] overflow-hidden pr-8 md:pr-[2vw]">
              <p className="text-[12px] md:text-[2vw] font-normal italic leading-[1.3] text-black w-full mb-4">
                {fixHangingPrepositions(blocks[1].text || '')}
              </p>
            </div>
            <div className="absolute bottom-2 right-2 md:bottom-[1.25vw] md:right-[1.25vw] group-hover:translate-x-2 transition-transform">
              <ArrowIcon />
            </div>
          </div>
        </Link>
      </div>

      {/* Row 2: Mountain Left / Blue + Text Right (732px) */}
      <div className="hidden md:flex flex-col md:flex-row border-b-2 border-black relative md:h-[50.8vw]">
        <Link to={`/article/${blocks[2].id || data.id}`} className="md:w-[33.47%] border-b-2 md:border-b-0 md:border-r-2 border-black flex flex-col relative overflow-hidden bg-white h-[304px] md:h-full justify-end hover:bg-thai-yellow/5 transition-colors group cursor-pointer">
          <Star className="top-4 right-4" />
          <div className="absolute inset-0 flex items-end">
            <ThaiMountainPattern className="w-full h-auto" />
          </div>
          <div className="relative z-10 p-[14px] md:p-[1.25vw] flex flex-col items-center">
            <p className="text-[14px] md:text-[2.2vw] font-normal italic leading-tight text-center mb-4 md:mb-8">
              {fixHangingPrepositions(blocks[2].title)}
            </p>
            <div className="self-end mr-2 group-hover:translate-x-2 transition-transform">
              <ArrowIcon />
            </div>
          </div>
        </Link>

        <div className="md:w-[66.53%] flex flex-col">
          {/* Blue Ornament */}
          <BlueSection />
          <Link to={`/article/${blocks[3].id || data.id}`} className="flex-1 p-[14px] md:p-[3vw] flex flex-col md:flex-row relative bg-white min-h-[300px] hover:bg-thai-yellow/5 transition-colors group cursor-pointer">
            <div className="md:w-1/2 flex flex-col justify-between mb-6 md:mb-0">
              <h2 className="text-[24px] md:text-[4vw] font-medium uppercase italic leading-[0.9] max-w-sm">
                {fixHangingPrepositions(blocks[3].title)}
              </h2>
              <div className="mt-auto hidden md:block border-t border-transparent h-1" />{/* Spacer */}
            </div>
            <div className="md:w-1/2 flex flex-col justify-end items-end pb-[14px] md:pb-[3vw]">
              <p className="text-[12px] md:text-[2vw] font-normal italic leading-[1.3] text-black w-full">
                {fixHangingPrepositions(blocks[3].text || '')}
              </p>
            </div>
            <div className="absolute bottom-4 right-4 md:bottom-[3vw] md:right-[3vw] group-hover:translate-x-2 transition-transform">
              <ArrowIcon />
            </div>
            <div className="absolute bottom-4 left-4 md:bottom-[3vw] md:left-[3vw]">
              <Star className="relative !w-[87px] !h-[87px] md:!w-[140px] md:!h-[140px]" />
            </div>
          </Link>
        </div>
      </div>

      {/* Row 3: Photo + Caption Left / Yellow Section / Mountain Right (737px) */}
      <div className="hidden md:flex flex-col md:flex-row border-b-2 border-black relative md:h-[51.1vw]">
        {/* Left: Large Photo (595px) + Caption (140px) */}
        <Link to={`/article/${blocks[4].id || data.id}`} className="md:w-[56.81%] border-b-2 md:border-b-0 md:border-r-2 border-black flex flex-col relative overflow-hidden bg-white hover:bg-thai-yellow/5 transition-colors group cursor-pointer">
          <Star className="top-4 right-4" />
          <div className="w-full flex-1 overflow-hidden">
            <img src={blocks[4].image} className="w-full h-full object-cover" alt="" />
          </div>
          <div className="p-[14px] md:p-[1.25vw] h-[68px] md:h-[9.7vw] md:min-h-[140px] flex flex-col justify-center border-t-2 border-black bg-white">
            <div className="flex justify-between items-center">
              <p className="text-[12px] md:text-[2.2vw] font-normal italic leading-tight max-w-[80%]">
                {fixHangingPrepositions(blocks[4].title)}
              </p>
              <div className="group-hover:translate-x-2 transition-transform">
                <ArrowIcon />
              </div>
            </div>
          </div>
        </Link>

        {/* Middle Yellow Section */}
        <div className="h-[76px] md:h-full md:w-[9.86%] border-b-2 md:border-b-0 md:border-r-2 border-black overflow-hidden relative">
          <YellowSection />
        </div>

        {/* Right: Mountain Block */}
        <Link to={`/article/${blocks[5].id || data.id}`} className="md:w-[33.33%] flex flex-col relative bg-white h-[304px] md:h-full overflow-hidden hover:bg-thai-yellow/5 transition-colors group cursor-pointer">
          <Star className="top-4 right-4" />
          <div className="flex-1 relative border-black overflow-hidden flex flex-col justify-end">
            <div className="absolute inset-x-0 bottom-0 flex items-end">
              <ThaiMountainPattern className="w-full h-auto" />
            </div>
            <div className="relative z-10 p-[14px] md:p-[1.25vw] flex flex-col items-center">
              <p className="text-[14px] md:text-[2.2vw] font-normal italic leading-tight text-center mb-4 md:mb-8">
                {fixHangingPrepositions(blocks[5].title)}
              </p>
              <div className="self-end mr-2 group-hover:translate-x-2 transition-transform">
                <ArrowIcon />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Row 4: TEST Block & Image (535px) */}
      <div className="hidden md:flex flex-col md:flex-row border-b-2 border-black relative md:h-[37.1vw]">
        <Star className="hidden md:block top-2 left-[66.53%] -translate-x-1/2 z-20" />

        <Link to={`/article/${blocks[0].id || data.id}`} className="flex flex-col md:flex-row h-full md:w-[66.53%] md:border-r-2 border-black hover:bg-thai-yellow/5 transition-colors group cursor-pointer">
          <div className="w-full p-[14px] md:p-[3vw] flex flex-col justify-between relative bg-white h-[220px] md:h-full">
            <Star className="top-2 right-2 md:hidden" />
            <div className="flex flex-col scale-50 md:scale-100 origin-left">
              <TestLogo />
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mt-4">
              <div className="md:hidden mb-2 group-hover:translate-x-2 transition-transform">
                <ArrowIcon />
              </div>
              <p className="text-[14px] md:text-[2.2vw] font-normal italic leading-tight max-w-[200px] md:max-w-sm">
                {fixHangingPrepositions(blocks[0].title)}
              </p>
              <div className="hidden md:block group-hover:translate-x-2 transition-transform">
                <ArrowIcon />
              </div>
            </div>
          </div>
        </Link>

        <div className="md:w-[33.47%] w-full h-[300px] md:h-full overflow-hidden relative border-t-2 md:border-t-0 border-black">
          <img src={blocks[0].image} className="w-full h-full object-cover" alt="" />
        </div>
      </div>

      <GreenSection />
    </div>
  );
};

export default CategoryTemplate3;
