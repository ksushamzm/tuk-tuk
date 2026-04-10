import React, { createContext, useContext, useState, useEffect } from 'react';

interface SiteContentContextType {
  content: Record<string, string>;
  loading: boolean;
}

const SiteContentContext = createContext<SiteContentContextType>({ content: {}, loading: true });

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch site content', err);
        setLoading(false);
      });
  }, []);

  return (
    <SiteContentContext.Provider value={{ content, loading }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => useContext(SiteContentContext);
