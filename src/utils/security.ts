'use client';

/**
 * Utility to fetch the user's public IP address.
 */
export async function fetchIp(): Promise<string | null> {
  try {
    const response = await fetch('https://api.ipify.org?format=json', {
      next: { revalidate: 0 }
    });
    const data = await response.json();
    return data.ip || null;
  } catch (error) {
    console.warn('IP address fetch failed:', error);
    return null;
  }
}

/**
 * Generates a unique device fingerprint based on browser properties.
 */
export function getDeviceFingerprint(): string {
  if (typeof window === 'undefined') return '';

  const components = [
    navigator.userAgent,
    screen.width,
    screen.height,
    navigator.language,
    navigator.platform,
    new Date().getTimezoneOffset(),
    // Simple canvas fingerprinting for better accuracy
    (() => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return '';
        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial'";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125,1,62,20);
        ctx.fillStyle = "#069";
        ctx.fillText("GetrePlus-Fingerprint-1.0", 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        ctx.fillText("GetrePlus-Fingerprint-1.0", 4, 17);
        return canvas.toDataURL();
      } catch (e) {
        return '';
      }
    })()
  ];

  const rawString = components.join('###');
  
  // Simple hash function to create a shorter fingerprint string
  let hash = 0;
  for (let i = 0; i < rawString.length; i++) {
    const char = rawString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return 'GP-' + Math.abs(hash).toString(16).toUpperCase();
}
