declare function paginator(
  paginateParams?: {
    currentPage?: number;
    limit?: number;
    totalItem?: number;
    baseUrl?: string;
  },
  reqQuery?: Record<string, any>
): {
  currentPage: number;
  totalPages: number;
  from: number;
  to: number;
  totalItem: number;
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  pagination: Array<{ page: number | string; url: string | null }>;
};

export default paginator;
