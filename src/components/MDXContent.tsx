'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';
import Link from 'next/link';

const components = {
  img: ({ src, alt, ...props }: any) => (
    <div className="relative w-full h-[400px] my-8">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover rounded-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  ),
  a: ({ href, children }: any) => (
    <Link href={href} className="text-purple-600 hover:text-purple-800">
      {children}
    </Link>
  ),
  h1: (props: any) => (
    <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-bold mt-6 mb-3" {...props} />
  ),
  p: (props: any) => (
    <p className="mb-4 leading-relaxed" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />
  ),
  li: (props: any) => (
    <li className="ml-4" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-gray-100 dark:bg-gray-800 rounded px-2 py-1" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto" {...props} />
  ),
};

export function MDXContent({ code }: { code: string }) {
  const MDXComponent = useMDXComponent(code);
  return <MDXComponent components={components} />;
}