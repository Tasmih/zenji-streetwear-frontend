import { useEffect } from 'react';

/**
 * Custom hook to dynamically update document title and meta description for SEO
 * @param {string} title
 * @param {string} [description]
 */
export const useDocumentTitle = (title, description) => {
  useEffect(() => {
    const fullTitle = title ? `${title} | ZENJI` : 'ZENJI — Luxury Streetwear & Archival Apparel';
    document.title = fullTitle;

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
    }
  }, [title, description]);
};
