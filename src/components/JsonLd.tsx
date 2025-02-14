// src/components/JsonLd.tsx
export default function JsonLd({ data }: { data: any }) {
    return (
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      </head>
    );
  }