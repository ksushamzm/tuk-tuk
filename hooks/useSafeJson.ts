import { useMemo } from 'react';

/**
 * Безопасный парсинг JSON с fallback значением
 */
export function useSafeJsonParse<T>(jsonString: string | undefined, fallback: T): T {
  return useMemo(() => {
    if (!jsonString) return fallback;
    
    try {
      return JSON.parse(jsonString) as T;
    } catch (error) {
      console.error('Failed to parse JSON:', error, 'Input:', jsonString);
      return fallback;
    }
  }, [jsonString, fallback]);
}

/**
 * Безопасный парсинг JSON без мемоизации (для использования вне компонентов)
 */
export function safeJsonParse<T>(jsonString: string | undefined, fallback: T): T {
  if (!jsonString) return fallback;
  
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error('Failed to parse JSON:', error, 'Input:', jsonString);
    return fallback;
  }
}
