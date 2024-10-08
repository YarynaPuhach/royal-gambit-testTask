import { Product } from "./types";

// API URL
const API_URL = 'https://642ec14a8ca0fe3352d7fe14.mockapi.io/api/v1/products';

export async function filterProducts(
  filters: {
    promotional?: boolean;
    active?: boolean;
    searchQuery?: string;
    page?: number;
    limit?: number;
  }
): Promise<{ products: Product[]; hasMore: boolean; currentPage: number }> {
  try {
    const { promotional, active, searchQuery, page = 1, limit} = filters;
    const params = new URLSearchParams();

    if (limit) params.append('limit', limit.toString());
    
    const currentPage = page;
    params.append('page', currentPage.toString());

    if (searchQuery) params.append('name', searchQuery);
    if (promotional) params.append('promotion', promotional.toString());
    if (active) params.append('active', active.toString());

    const response = await fetch(`${API_URL}?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const products = await response.json();
    const hasMore = products.length === limit;

    return { products, hasMore, currentPage };
  } catch (error) {
    console.error('Error filtering products:', error);
    throw error;
  }
}