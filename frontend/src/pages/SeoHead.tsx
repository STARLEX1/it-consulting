import { useEffect } from 'react';

interface SeoHeadProps {
  title: string;
  description: string;
  keywords?: string;
}

const SeoHead: React.FC<SeoHeadProps> = ({ title, description, keywords }) => {
  useEffect(() => {
    document.title = `${title} — Парус-Рязань`;
    
    const setMeta = (name: string, content: string, attr = 'name') => {
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };
    
    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    
    // Open Graph
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
  }, [title, description, keywords]);
  
  return null;
};

export default SeoHead;