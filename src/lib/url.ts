const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a root-relative path ("/", "/ko/", "/images/…") with the deploy base path. */
export const withBase = (path: string) => `${base}${path}`;
