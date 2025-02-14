// src/types/contentlayer.d.ts
declare module 'contentlayer/generated' {
    export type { Blog, Service } from '.contentlayer/generated';
    export const allBlogs: Blog[];
    export const allServices: Service[];
  }