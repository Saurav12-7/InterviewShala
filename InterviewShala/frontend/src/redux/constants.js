const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const BASE_URL = API_BASE_URL;
export const USERS_URL = `${API_BASE_URL}/api/users`;
export const CATEGORY_URL = `${API_BASE_URL}/api/category`;
export const PRODUCT_URL = `${API_BASE_URL}/api/products`;
export const UPLOAD_URL = `${API_BASE_URL}/api/upload`;
export const ORDERS_URL = `${API_BASE_URL}/api/orders`;
export const PAYPAL_URL = `${API_BASE_URL}/api/config/paypal`;
