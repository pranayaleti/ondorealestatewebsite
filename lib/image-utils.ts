/**
 * Image utility functions for optimized image delivery
 * Automatically uses WebP versions when available for better performance
 */

/**
 * Get the optimized image path (WebP if available, fallback to original)
 * @param src - Original image path (e.g., "/image.png")
 * @returns Optimized path (e.g., "/image.webp" or "/image.png")
 */
export function getOptimizedImagePath(src: string): string {
  if (typeof window === 'undefined') {
    // Server-side: check if WebP exists
    // For static export, we'll use WebP if it exists
    if (src.endsWith('.png') || src.endsWith('.jpg') || src.endsWith('.jpeg')) {
      const webpPath = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      // In a real implementation, you'd check if the file exists
      // For now, we'll assume WebP versions exist for optimized images
      return webpPath;
    }
  } else {
    // Client-side: try WebP, fallback to original
    if (src.endsWith('.png') || src.endsWith('.jpg') || src.endsWith('.jpeg')) {
      const webpPath = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      // Use WebP if browser supports it (modern browsers do)
      if (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0) {
        return webpPath;
      }
    }
  }
  return src;
}

/**
 * Get image src with WebP fallback
 * Uses WebP if available, otherwise falls back to original format
 */
export function getImageSrc(originalSrc: string): string {
  // For static export with pre-optimized WebP files, use WebP directly
  const webpSrc = originalSrc.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  
  // List of images we know have WebP versions
  const hasWebP = [
    'abstract-geometric-shapes',
    'city-map-with-pin',
    'founder-image',
    'leaking-faucet',
    'modern-apartment-balcony',
    'modern-office-building',
    'modern-townhouse-garage',
    'professional-man-suit',
    'professional-woman-glasses',
    'professional-woman-smiling',
    'property-manager-meeting',
    'suburban-house-garden',
  ];
  
  const imageName = originalSrc.split('/').pop()?.replace(/\.(png|jpg|jpeg)$/i, '') || '';
  
  if (hasWebP.includes(imageName)) {
    return webpSrc;
  }
  
  return originalSrc;
}

