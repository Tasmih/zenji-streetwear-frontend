import { useEffect } from 'react';

/**
 * Custom hook to dynamically update document title and meta description for SEO
 * @param {string} title
 * @param {string} [description]
 */
export const useDocumentTitle = (title, description) => {
  useEffect(() => {
    const finalTitle = title
      ? title.includes('ZENJI')
        ? title
        : `${title} | ZENJI`
      : 'ZENJI Tokyo Atelier | Premium Japanese Streetwear';

    document.title = finalTitle;

    // Update OpenGraph and Twitter title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', finalTitle);
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', finalTitle);

    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', description);
      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.setAttribute('content', description);
    }
  }, [title, description]);
};
