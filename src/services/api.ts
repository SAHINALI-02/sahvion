/**
 * SAHVION Production API Client
 * Connects frontend React components to the FastAPI backend through the frontend origin.
 * Vite proxies /api/* requests to the internal FastAPI service on port 8000.
 */

const API_BASE_URL = (import.meta.env.VITE_API_URL as string)?.replace(/\/$/, '') || '/api';

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
}

export interface ContactResponse {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  created_at: string;
  status: string;
  confirmation_message: string;
}

export interface NewsletterPayload {
  email: string;
}

export interface NewsletterResponse {
  id: number;
  email: string;
  is_active: boolean;
  created_at: string;
  message: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  thumbnail?: string;
  images: string[];
  technologies: string[];
  live_url?: string;
  github_url?: string;
  created_at: string;
  updated_at: string;
}

export const api = {
  /**
   * Submit client inquiry to POST /api/contact
   */
  async submitContact(payload: ContactPayload): Promise<ContactResponse> {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData.detail || 'Something went wrong. Please try again.';
      throw new Error(message);
    }

    return response.json();
  },

  /**
   * Subscribe to newsletter radar via POST /api/newsletter/subscribe
   */
  async subscribeNewsletter(email: string): Promise<NewsletterResponse> {
    const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData.detail || 'Something went wrong. Please try again.';
      throw new Error(message);
    }

    return response.json();
  },

  /**
   * Fetch portfolio projects from GET /api/projects
   */
  async getProjects(category?: string): Promise<Project[]> {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:8000';
    const url = new URL(`${API_BASE_URL}/projects`, baseUrl);
    if (category) {
      url.searchParams.append('category', category);
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch projects from backend.');
    }

    return response.json();
  },

  /**
   * Fetch single project by ID or slug
   */
  async getProject(idOrSlug: string | number): Promise<Project> {
    const response = await fetch(`${API_BASE_URL}/projects/${idOrSlug}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Project ${idOrSlug} not found.`);
    }

    return response.json();
  },
};
