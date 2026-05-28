
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Ticker from './Ticker';

interface InfoGridProps {
  onTestClick?: () => void;
  content?: Record<string, string>;
}

const InfoGrid: React.FC<InfoGridProps> = ({ onTestClick, content }) => {
  const navigate = useNavigate();

  return (
    <>
    <div className="grid grid-cols-2 lg:grid-cols-3 border-b-2 border-black bg-white">
      
      {/* Column 1: Test (Pink) */}
      <div 
        onClick={onTestClick}
        className="relative h-[300px] md:h-[535px] border-b-2 md:border-b-0 border-r-2 border-black bg-thai-pink overflow-hidden group cursor-pointer"
      >
         <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
            <img
              src={content?.['info_test_image'] || "/images/тестглавная.png"}
              alt="Тест"
              className="w-full h-full object-cover object-top"
            />
         </div>

         <div className="absolute top-6 left-6 z-10">
           <svg width="146" height="53" viewBox="0 0 146 53" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] w-[120px] md:w-[180px] h-auto">
             <path d="M143.902 1.59912L143.698 2.771L142.537 9.42627L142.393 10.2544H130.112L124.271 44.0044L124.127 44.8335H113.799L114.002 43.6626L114.205 42.4917L119.807 10.2544H107.709L107.913 9.08252L109.074 2.42725L109.219 1.59912H143.902Z" fill="white" stroke="black" strokeWidth="2"/>
             <path d="M91.501 1.00488L91.5 1.00586C94.6099 1.06494 97.3063 1.73392 99.5439 3.06543H99.5449C101.786 4.36961 103.512 6.19953 104.712 8.5332H104.714C105.927 10.8377 106.587 13.5076 106.725 16.5156L106.772 17.5645L105.723 17.5605L97.4814 17.5322L96.4727 17.5293L96.4844 16.5205C96.5022 15.0781 96.3235 13.8561 95.9727 12.8369L95.9697 12.8271L95.9668 12.8184C95.6519 11.8422 95.1192 11.126 94.374 10.6191L94.2217 10.5176C93.4949 10.0599 92.4458 9.76534 90.9932 9.71582V9.71484C89.3333 9.66347 87.9979 9.9942 86.9336 10.6455C85.8037 11.3369 84.8639 12.2652 84.1113 13.4453C83.3506 14.6677 82.7457 16.0098 82.2988 17.4756C81.859 18.98 81.5304 20.4526 81.3115 21.8936L80.918 24.8096L80.9189 24.8105C80.772 26.0047 80.67 27.3358 80.6143 28.8047V28.8057C80.5607 30.1976 80.6764 31.5169 80.958 32.7666C81.2233 33.9439 81.7262 34.8847 82.4492 35.625C83.0382 36.2118 83.9631 36.6128 85.3643 36.7031L85.6514 36.7168L86.2305 36.7227C87.5505 36.7037 88.6586 36.4591 89.5781 36.0205L89.583 36.0176C90.6637 35.5099 91.5341 34.7623 92.208 33.7598L92.2148 33.751C92.9236 32.7216 93.4544 31.4663 93.79 29.9648L93.79 29.9648L93.9619 29.1943L94.752 29.1826L102.852 29.0693L103.992 29.0537L103.858 30.1865C103.481 33.3869 102.39 36.1692 100.566 38.5L100.567 38.501C98.7839 40.7855 96.5362 42.5296 93.8408 43.7275L93.835 43.7305C91.1447 44.9061 88.2346 45.4586 85.1182 45.3994H85.1162C82.2316 45.3401 79.7315 44.7258 77.6621 43.5049L77.6553 43.501V43.5C75.6225 42.2801 74.0176 40.6463 72.8555 38.6074C71.7129 36.6029 70.9668 34.3778 70.6104 31.9424C70.2569 29.5274 70.2382 27.0576 70.5508 24.5371L70.5527 24.5234L70.9492 21.6631L70.9502 21.6543C71.3399 19.0043 72.0514 16.4412 73.084 13.9668L73.0869 13.9609L73.2891 13.4971C74.3205 11.1926 75.64 9.12197 77.249 7.29102C78.9807 5.32056 81.0342 3.76616 83.4023 2.63184C85.8091 1.47901 88.5166 0.94559 91.501 1.00488Z" fill="white" stroke="black" strokeWidth="2"/>
             <path d="M72.9033 1.59912L72.6992 2.771L71.5381 9.42627L71.3936 10.2544H52.8486L51.4346 18.3931H67.2686L67.0635 19.5659L65.9307 26.0229L65.7852 26.8501H49.9648L48.3398 36.2065H66.957L66.752 37.3794L65.5908 44.0063L65.4453 44.8335H36.5137L36.7158 43.6626L43.8525 2.42822L43.9961 1.59912H72.9033Z" fill="white" stroke="black" strokeWidth="2"/>
             <path d="M41.3828 1.59912L41.1787 2.771L40.0176 9.42627L39.873 10.2544H27.5928L21.751 44.0044L21.6074 44.8335H11.2793L11.4824 43.6626L17.2871 10.2544H5.18945L5.39355 9.08252L6.55469 2.42725L6.69922 1.59912H41.3828Z" fill="white" stroke="black" strokeWidth="2"/>
           </svg>
         </div>
         
      </div>

      {/* Column 2: Etiquette (White with Custom Window Frame) */}
      <div 
        onClick={() => navigate('/category/Этика')}
        className="relative h-[300px] md:h-[535px] border-b-2 md:border-b-0 md:border-r-2 border-black bg-white flex flex-col items-center justify-between p-0 overflow-hidden group cursor-pointer"
      >
         
         <div className="w-full h-full relative flex items-center justify-center p-4 md:p-8">
            {/* Thai Window Shape SVG Background */}
            <div className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-[1.02]">
               <svg width="100%" height="100%" viewBox="0 0 482 530" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M481.001 528.116H1.44003L1.00085 157.224C1.00085 157.224 25.9884 150.271 29.3264 138.074C40.7713 96.2534 87.1471 107.786 87.1471 107.786C84.8541 97.3556 94.9716 85.6014 103.764 78.8686C110.598 73.6337 118.774 69.6971 127.698 67.3917C139.924 64.2313 154.241 63.4957 166.599 66.5215C168.276 66.9323 169.963 67.3766 171.552 67.9776C172.361 68.2874 174.617 69.016 174.908 69.8154C167.574 48.9059 181.952 30.159 209.83 25.351C237.707 20.5431 240.061 0.116211 240.061 0.116211C240.061 0.116211 242.407 20.5512 270.293 25.351C298.171 30.1579 312.557 48.9059 305.215 69.8154C305.495 69.0149 307.762 68.2793 308.569 67.9776C310.159 67.3766 311.846 66.9334 313.524 66.5204C325.881 63.5038 340.198 64.2313 352.424 67.3917C361.339 69.6971 369.525 73.6337 376.359 78.8686C385.15 85.6095 395.268 97.3545 392.975 107.786C392.975 107.786 439.342 96.2453 450.795 138.074C454.133 150.271 480.535 157.502 480.535 157.502L481.001 528.116Z" fill="white" stroke="black" strokeWidth="2"/>
               </svg>
            </div>
            
            <div className="relative z-10 text-center mt-16 md:mt-32">
                <h3 className="font-roboto italic font-normal text-xl md:text-3xl leading-snug text-black whitespace-pre-line">
                  {content?.['info_etiquette_text'] || "На сколько хорошо \nВы знаете тайский этикет?"}
                </h3>
            </div>
            
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-10 group-hover:translate-x-2 transition-transform">
               <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NSIgaGVpZ2h0PSI1NSIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNSAxMmgyNDQgbTctNyA3IDctNyA3IiB0cmFuc2Zvcm09InNjYWxlKDAuMDUpIi8+PHBhdGggZD0iTTUgMTJoMTQiIC8+PHBhdGggZD0ibTEyIDUgNyA3LTcgNyIgLz48L3N2Zz4=" alt="" className="w-8 h-8 md:w-12 md:h-12" />
            </div>
         </div>
      </div>

      {/* Column 3: Letter of Day */}
      <div className="relative h-[300px] md:h-[535px] col-span-2 lg:col-span-1 border-t-2 md:border-t-0 border-black bg-white flex flex-col items-center justify-between py-6 md:py-12 group hover:bg-gray-50 transition-colors">
         <div className="text-center">
            <h3 className="font-roboto font-black italic text-3xl md:text-5xl leading-none uppercase text-black">
              БУКВА ДНЯ
            </h3>
         </div>
         
         <div className="relative flex-1 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
             <div className="relative">
                <img src="/images/n.svg" alt="" className="w-[100px] md:w-[180px] h-auto" style={{ filter: 'drop-shadow(-6px 4px 0px #000000)' }} />
             </div>
         </div>

         <div className="text-center">
           <p className="font-roboto font-normal text-3xl md:text-5xl leading-none">{content?.['info_letter_char'] || "ก"}</p>
           <p className="font-roboto font-bold italic text-2xl md:text-4xl leading-none uppercase mt-2">{content?.['info_letter_transcription'] || "«ко кай»"}</p>
         </div>
      </div>
    </div>
    
    {/* Bottom Ticker */}
    <Ticker text="ИНТЕРВЬЮ" direction="right" className="bg-[#FFFFFF]" large />
    </>
  );
};

export default InfoGrid;
