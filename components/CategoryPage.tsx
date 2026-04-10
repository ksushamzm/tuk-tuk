import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { categoriesData } from '../data/categoriesData';
import CategoryTemplate1 from './CategoryTemplate1';
import CategoryTemplate2 from './CategoryTemplate2';
import CategoryTemplate3 from './CategoryTemplate3';
import CategoryTemplate4 from './CategoryTemplate4';

const CategoryPage: React.FC = () => {
  const { name } = useParams();
  const categoryId = name?.toLowerCase() || '';
  const data = categoriesData[categoryId];

  // If we have custom template data, use it. 
  // Otherwise we could fall back to the old grid view or a default template.
  
  if (!data) {
    return (
      <div className="w-full bg-white flex flex-col min-h-screen p-8 md:p-16">
        <Link to="/" className="inline-flex items-center gap-2 font-bold hover:text-thai-magenta transition-colors mb-8">
          <ArrowLeft size={20} /> На главную
        </Link>
        <h1 className="font-roboto font-black italic text-5xl md:text-7xl uppercase leading-tight mb-12">
          Категория: {name}
        </h1>
        <p className="text-2xl font-bold text-gray-500 italic">Данные для этой категории скоро появятся...</p>
      </div>
    );
  }

  // Template selection logic
  switch (data.templateId) {
    case 1:
      return <CategoryTemplate1 data={data} />;
    case 2:
      return <CategoryTemplate2 data={data} />;
    case 3:
      return <CategoryTemplate3 data={data} />;
    case 4:
      return <CategoryTemplate4 data={data} />;
    default:
      return <CategoryTemplate1 data={data} />;
  }
};



export default CategoryPage;

