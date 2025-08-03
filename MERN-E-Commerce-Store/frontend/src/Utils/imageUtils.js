const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Converts relative image URLs to absolute URLs for production
 * @param {string} imageUrl - The image URL from the database
 * @returns {string} - Absolute URL for the image
 */
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return '';
  
  // If it's already an absolute URL, return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // If it's a relative URL starting with /, prepend the API base URL
  if (imageUrl.startsWith('/')) {
    return `${API_BASE_URL}${imageUrl}`;
  }
  
  // If it doesn't start with /, assume it's a relative path and prepend the API base URL with /
  return `${API_BASE_URL}/${imageUrl}`;
}; 