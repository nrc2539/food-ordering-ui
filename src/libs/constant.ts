export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export const DEFAULT_PERPAGE = 10;

export const DEFAULT_PAGE = 1;

export const passwordRegx =
  /^(?=.*[A-Za-z])(?=.*[\W_])[A-Za-z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~-]{10,}$/;
