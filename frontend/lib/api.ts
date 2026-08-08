// lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface Product {
    id: number;
    name: string;
    description: string | null;
    price: number;
    category: string | null;
    image_url: string | null;
    stock_quantity: number;
    is_active: boolean;
    created_at: string;
    updated_at: string | null;
}

export interface ProductListResponse {
    total: number;
    products: Product[];
    page: number;
    page_size: number;
}

export async function getProducts(page = 1, pageSize = 10): Promise<ProductListResponse> {
    const params = new URLSearchParams({
        page: page.toString(),
        page_size: pageSize.toString(),
    });

    try {
        const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`, {
            cache: 'no-store',
            next: { revalidate: 0 }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ProductListResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        
        // Durante build time o cuando el backend no está disponible, devolver datos vacíos
        return {
            total: 0,
            products: [],
            page,
            page_size: pageSize
        };
    }
}
