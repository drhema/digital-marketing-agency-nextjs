export function ensureAbsolutePath(path: string): string {
    if (!path) return path;
    return path.startsWith('/') ? path : `/${path}`;
  }
  
  export function getImagePath(path: string, locale?: string): string {
    const absolutePath = ensureAbsolutePath(path);
    // Remove any locale prefix if it exists
    return absolutePath.replace(/^\/[a-z]{2}\//, '/');
  }