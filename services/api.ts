// Единый слой доступа к API

const API_BASE_URL = '/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new ApiError(response.status, error.error || `HTTP ${response.status}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(0, error instanceof Error ? error.message : 'Network error');
  }
}

// Site Content API
export const siteContentApi = {
  get: () => fetchApi<Record<string, string>>('/content'),
  
  update: (content: Record<string, string>) =>
    fetchApi<{ message: string }>('/content', {
      method: 'PUT',
      body: JSON.stringify(content),
    }),
};

// Articles API
export interface Article {
  id: number;
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  excerpt: string;
  createdAt?: string;
}

export const articlesApi = {
  getAll: () => fetchApi<Article[]>('/articles'),
  
  getBySlug: (slug: string) => fetchApi<Article>(`/articles/${encodeURIComponent(slug)}`),
};

// Template Articles API
export interface TemplateArticle {
  id: string;
  categoryId: string;
  templateId: number;
  title: string;
  section1Title?: string;
  section1Text: string[];
  image1?: string;
  image2?: string;
  section2Title?: string;
  section2Text: string[];
  createdAt?: string;
  updatedAt?: string;
}

export const templateArticlesApi = {
  getAll: () => fetchApi<TemplateArticle[]>('/template-articles'),
  
  getBySlug: (slug: string) => fetchApi<TemplateArticle>(`/template-articles/${encodeURIComponent(slug)}`),
  
  create: (article: Partial<TemplateArticle>) =>
    fetchApi<{ id: string; message: string }>('/template-articles', {
      method: 'POST',
      body: JSON.stringify(article),
    }),
  
  update: (slug: string, article: Partial<TemplateArticle>) =>
    fetchApi<{ message: string }>(`/template-articles/${encodeURIComponent(slug)}`, {
      method: 'PUT',
      body: JSON.stringify(article),
    }),
  
  delete: (id: string) =>
    fetchApi<{ message: string }>(`/template-articles/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }),
};

// Test Questions API
export interface TestQuestion {
  id: number;
  question: string;
  options: Array<{ id: string; text: string }>;
  correctId: string;
  explanation: string;
  orderIndex: number;
}

export const testQuestionsApi = {
  getAll: () => fetchApi<TestQuestion[]>('/test-questions'),
  
  updateAll: (questions: Partial<TestQuestion>[]) =>
    fetchApi<{ message: string }>('/test-questions', {
      method: 'PUT',
      body: JSON.stringify(questions),
    }),
};

// Upload API
export const uploadApi = {
  uploadImage: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new ApiError(response.status, 'Failed to upload image');
    }
    
    return response.json();
  },
};

export { ApiError };
