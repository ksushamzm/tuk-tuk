import React from 'react';
import { Link } from 'react-router-dom';
import { CategoryData } from '../data/categoriesData';
import ThaiPatternVertical from './ThaiPatternVertical';
import ThaiMountainPattern from './ThaiMountainPattern';
import GreenSection from './GreenSection';
import OrangeSection from './OrangeSection';
import YellowSection from './YellowSection';

interface Props {
  data: CategoryData;
}

const CategoryTemplate1: React.FC<Props> = ({ data }) => {
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
      {/* Title Header */}
      <div className="hidden md:block py-16 border-b-2 border-black text-center">
        <h1 className="text-5xl md:text-[4vw] font-medium uppercase tracking-tighter italic leading-none">{fixHangingPrepositions(title)}</h1>
      </div>

      {/* Row 1: Main Image */}
      <div className="flex flex-col border-b-2 border-black relative">
        <div className="relative overflow-hidden bg-white border-b-2 md:border-b-0 md:border-r-2 border-black md:hidden">
          <Star className="top-4 right-4" />
          <img src={blocks[0].image} className="w-full aspect-[4/3] object-cover" alt="" />
          <Link to={`/article/${blocks[0].id || data.id}`} className="block p-[14px] h-[68px] flex items-center justify-between border-t-2 border-black bg-white hover:bg-thai-yellow/10 transition-colors group cursor-pointer">
            <p className="text-[12px] font-normal italic leading-tight">{fixHangingPrepositions(blocks[0].title)}</p>
            <div className="group-hover:translate-x-2 transition-transform">
              <ArrowIcon />
            </div>
          </Link>
        </div>

        {/* Desktop Row 1 Structure */}
        <div className="hidden md:flex md:h-[51vw]">
          <div className="md:w-[61.27%] border-r-2 border-black flex flex-col relative overflow-hidden bg-white">
            <Star className="top-6 right-6" />
            <div className="w-full flex-1 overflow-hidden">
              <img src={blocks[0].image} className="w-full h-full object-cover" alt="" />
            </div>
            <Link to={`/article/${blocks[0].id || data.id}`} className="block p-[1.25vw] min-h-[140px] md:h-[9.7vw] flex flex-col justify-center border-t-2 border-black bg-white hover:bg-thai-yellow/10 transition-colors group cursor-pointer">
              <div className="flex justify-between items-center">
                <p className="text-[2.2vw] font-normal italic leading-tight max-w-[80%] uppercase">{fixHangingPrepositions(blocks[0].title)}</p>
                <div className="group-hover:translate-x-2 transition-transform">
                  <ArrowIcon />
                </div>
              </div>
            </Link>
          </div>

          {/* Vertical Yellow Strip between columns (Width ~9.72%) */}
          <div className="md:w-[9.72%] border-r-2 border-black h-full overflow-hidden bg-thai-yellow">
            <YellowSection vertical />
          </div>

          <Link to={`/article/${blocks[1].id || data.id}`} className="md:w-[29.01%] flex flex-col relative bg-white group cursor-pointer hover:bg-thai-yellow/5 transition-colors">
            <div className="flex-1 relative border-black overflow-hidden flex flex-col">
              <Star className="top-6 right-6" />
              <div className="absolute inset-x-0 bottom-0 flex items-end">
                <ThaiMountainPattern className="w-full h-auto max-h-[70%]" />
              </div>
              <div className="relative z-10 flex-1 flex flex-col justify-end">
                <div className="px-[1.25vw] min-h-[140px] md:h-[11.8vw] relative flex flex-col justify-center items-center">
                  <p className="text-[2.2vw] font-normal italic leading-[1.1] text-center max-w-[85%] -translate-y-4">
                    {fixHangingPrepositions(blocks[1].title)}
                  </p>
                  <div className="absolute bottom-4 right-4 translate-y-[-50%] group-hover:translate-x-2 transition-transform">
                    <ArrowIcon />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Row 1.5 Mobile: Empty Left / Top-5 Right (304px) */}
      <div className="md:hidden flex h-[304px] border-b-2 border-black">
        <div className="w-1/2 border-r-2 border-black bg-white"></div>
        <Link to={`/article/${blocks[1].id || data.id}`} className="w-1/2 relative overflow-hidden flex flex-col justify-end group cursor-pointer hover:bg-thai-yellow/5 transition-colors">
          <Star className="top-2 right-2" />
          <div className="absolute inset-0 flex items-end">
            <ThaiMountainPattern className="w-full h-auto" />
          </div>
          <div className="relative z-10 p-[14px] pb-8 flex flex-col items-center">
            <p className="text-[14px] font-normal italic leading-tight text-center mb-4">
              {fixHangingPrepositions(blocks[1].title)}
            </p>
            <div className="self-end mr-2 group-hover:translate-x-2 transition-transform">
              <ArrowIcon />
            </div>
          </div>
        </Link>
      </div>

      {/* Row 2: TEST Block & Image */}
      <div className="flex flex-col md:flex-row border-b-2 border-black relative md:h-[37.1vw]">
        {/* Desktop Shared Star */}
        <Star className="hidden md:block top-2 left-[66.53%] -translate-x-1/2 z-20" />

        {/* Mobile Left 50% / Right 50% Structure for Row 2 */}
        <Link to={`/article/${blocks[2].id || data.id}`} className="flex h-[220px] md:h-full md:w-[66.53%] md:border-r-2 border-black group cursor-pointer hover:bg-thai-yellow/5 transition-colors bg-white">
          <div className="w-1/2 md:w-full p-[14px] md:p-[2vw] border-r-2 md:border-r-0 border-black flex flex-col justify-between relative h-full md:min-h-0">
            <Star className="top-2 right-2 md:hidden" />
            <div className="flex flex-col scale-50 md:scale-100 origin-left">
              <TestLogo />
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mt-4">
              <div className="md:hidden mb-2 group-hover:translate-x-2 transition-transform">
                <ArrowIcon />
              </div>
              <p className="text-[14px] md:text-[2.2vw] font-normal italic leading-tight max-w-[120px] md:max-w-sm">
                {fixHangingPrepositions(blocks[2].title)}
              </p>
              <div className="hidden md:block group-hover:translate-x-2 transition-transform">
                <ArrowIcon />
              </div>
            </div>
          </div>
          <div className="w-1/2 md:hidden">
            <img src={blocks[2].image || "https://picsum.photos/seed/thai2/600/600"} className="w-full h-full object-cover" alt="" />
          </div>
        </Link>

        {/* Desktop-only Image block */}
        <div className="hidden md:block md:w-[33.47%] w-full h-full overflow-hidden relative">
          <img src={blocks[2].image || "https://picsum.photos/seed/thai_temple_sleep/600/600"} className="w-full h-full object-cover" alt="" />
        </div>
      </div>

      {/* Row 3: Buddhism (Hidden on Mobile) */}
      <div className="hidden md:flex flex-col lg:flex-row border-b-2 border-black relative md:h-[37.1vw]">
        <div className="w-full lg:w-[33.47%] border-b-2 lg:border-b-0 lg:border-r-2 border-black relative overflow-hidden h-full">
          <Star className="top-6 right-6" />
          <div className="w-full h-full overflow-hidden">
            <img src={blocks[3].image} className="w-full h-full object-cover" alt="" />
          </div>
        </div>
        <div className="w-full lg:w-[66.53%] p-[3vw] flex flex-col relative overflow-hidden bg-white">
          <div className="w-full flex flex-col justify-start relative">
            <h2 className="text-[5vw] lg:text-[4.5vw] font-medium uppercase italic leading-[0.8] break-words">
              {fixHangingPrepositions(blocks[3].title)}
            </h2>
          </div>
          <div className="w-full flex items-end justify-end relative flex-1 pt-[2vw]">
            <div className="absolute bottom-0 left-0">
              <Star className="relative top-0 left-0 w-[8.7vw] h-[8.7vw]" />
            </div>
            <Link to={`/article/${blocks[3].id || 'архитектура'}`} className="block w-full lg:w-1/2 hover:bg-thai-yellow/10 transition-colors group cursor-pointer flex flex-col justify-end pb-[1vw]">
              <p className="text-[2.2vw] lg:text-[1.8vw] font-normal italic leading-[1.3] text-black w-full text-right mb-4">
                {fixHangingPrepositions(blocks[3].text || '')}
              </p>
              <div className="flex justify-end group-hover:translate-x-2 transition-transform">
                <ArrowIcon />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Row 4: Why Gold / Architects */}
      <div className="flex flex-col border-b-2 border-black overflow-hidden bg-white">
        {/* Mobile Row 4 part 1: Why Gold Left / Empty Right */}
        <div className="md:hidden flex h-[304px] border-b-2 border-black">
          <Link to={`/article/${blocks[4].id || data.id}`} className="w-1/2 border-r-2 border-black relative p-[14px] bg-white flex flex-col justify-end group cursor-pointer hover:bg-thai-yellow/5 transition-colors">
            <Star className="top-2 right-2" />
            <div className="absolute inset-0 flex items-end">
              <ThaiMountainPattern className="w-full h-auto" />
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <p className="text-[14px] font-normal italic leading-tight text-center mb-4">
                {fixHangingPrepositions(blocks[4].title)}
              </p>
              <div className="self-end mr-2 group-hover:translate-x-2 transition-transform"><ArrowIcon /></div>
            </div>
          </Link>
          <div className="w-1/2 bg-white"></div>
        </div>

        {/* Architects Block (Shared for both) */}
        <div className="flex flex-col md:flex-row md:h-[50.8vw]">
          {/* Desktop-only Gold Block */}
          <Link to={`/article/${blocks[4].id || data.id}`} className="hidden md:flex md:w-[33.47%] border-r-2 border-black flex flex-col relative overflow-hidden bg-white group cursor-pointer hover:bg-thai-yellow/5 transition-colors">
            <Star className="top-6 right-6" />
            <div className="flex-1 relative flex flex-col justify-end">
              <div className="absolute inset-x-0 bottom-0 flex items-end">
                <ThaiMountainPattern className="w-full h-auto max-h-[70%]" />
              </div>
              <div className="p-[1.25vw] h-[11.8vw] relative flex flex-col justify-center items-center z-10">
                <p className="text-[2.2vw] font-normal italic leading-tight text-center max-w-[85%] -translate-y-4">
                  {fixHangingPrepositions(blocks[4].title)}
                </p>
                <div className="absolute bottom-4 right-4 translate-y-[-50%] group-hover:translate-x-2 transition-transform">
                  <ArrowIcon />
                </div>
              </div>
            </div>
          </Link>

          <div className="md:w-[66.53%] flex flex-col h-full">
            <div className="hidden md:flex md:h-[13.6vw] border-b-2 border-black overflow-hidden shrink-0">
              <OrangeSection />
            </div>
            <Link to={`/article/${blocks[5].id || data.id}`} className="p-[14px] md:p-[3vw] flex flex-col flex-1 relative bg-white min-h-[180px] md:min-h-[350px] group cursor-pointer hover:bg-thai-yellow/5 transition-colors">
              <div className="w-[60%] xl:w-1/2 flex flex-col justify-start">
                <h2 className="text-[28px] md:text-[5vw] xl:text-[4vw] font-medium uppercase italic leading-[0.8] max-w-full">
                  {fixHangingPrepositions(blocks[5].title)}
                </h2>
              </div>
              <div className="w-full md:w-1/2 md:self-end flex flex-col justify-start items-end md:items-end relative pt-[4vw] md:pt-[2vw]">
                <p className="text-[14px] md:text-[2.2vw] xl:text-[1.8vw] font-normal italic leading-[1.3] text-black mb-4 w-1/2 md:w-full text-left md:text-right">
                  {fixHangingPrepositions(blocks[5].text || '')}
                </p>
              </div>
              <div className="absolute top-24 left-4 md:static md:mt-auto">
                <Star className="relative md:top-auto left-0 md:absolute md:bottom-0" />
              </div>
              {/* Фиксированная стрелка в углу */}
              <div className="absolute bottom-24 right-4 md:bottom-[3vw] md:right-[3vw] group-hover:translate-x-2 transition-transform">
                <ArrowIcon />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <GreenSection />
    </div>
  );
};

export default CategoryTemplate1;
