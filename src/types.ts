// src/types.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  msrp?: number;
  thumbnailImageUrl: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
}
