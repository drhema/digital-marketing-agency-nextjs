// src/lib/content/utils.ts
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const CONTENT_PATH = path.join(process.cwd(), 'src/content');

export async function ensureDirectory(type: 'blog' | 'services') {
  const dirPath = path.join(CONTENT_PATH, type);
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
  return dirPath;
}

export async function getContentBySlug(
  type: 'blog' | 'services',
  slug: string,
  locale: 'en' | 'ar'
) {
  try {
    const dirPath = await ensureDirectory(type);
    const filePath = path.join(dirPath, `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    if (!data || !data[locale]) {
      return null;
    }

    const mdxContent = await serialize(data[locale].content || content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ],
      },
    });

    return {
      ...data,
      content: {
        ...data[locale],
        content: mdxContent
      }
    };
  } catch (error) {
    console.error(`Error getting ${type} content:`, error);
    return null;
  }
}

export async function getAllContent(
  type: 'blog' | 'services',
  locale: 'en' | 'ar'
) {
  try {
    const dirPath = await ensureDirectory(type);
    const files = await fs.readdir(dirPath);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));

    const content = await Promise.all(
      mdxFiles.map(async (filename) => {
        try {
          const filePath = path.join(dirPath, filename);
          const fileContent = await fs.readFile(filePath, 'utf-8');
          const { data, content } = matter(fileContent);

          if (!data || !data[locale]) {
            return null;
          }

          const mdxContent = await serialize(data[locale].content || content, {
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: 'wrap' }],
              ],
            },
          });

          return {
            ...data,
            content: {
              ...data[locale],
              content: mdxContent
            }
          };
        } catch (error) {
          console.error(`Error processing ${filename}:`, error);
          return null;
        }
      })
    );

    return content.filter(item => item !== null);
  } catch (error) {
    console.error(`Error getting ${type} content:`, error);
    return [];
  }
}

export async function getContentPaths(type: 'blog' | 'services') {
  try {
    const dirPath = await ensureDirectory(type);
    const files = await fs.readdir(dirPath);
    const slugs = files
      .filter(file => file.endsWith('.mdx'))
      .map(file => file.replace('.mdx', ''));

    return slugs.flatMap(slug => [
      { params: { locale: 'en', slug } },
      { params: { locale: 'ar', slug } }
    ]);
  } catch (error) {
    console.error(`Error getting ${type} paths:`, error);
    return [];
  }
}