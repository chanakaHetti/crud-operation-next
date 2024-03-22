import Link from 'next/link';

import { db } from '@/db';

// 01. Disable cache entirely on our Home page
// 1. First method - When define this, this route becomes a dynamic route
// export const dynamic = 'force-dynamic';

// 2. Second method
// export const revalidate = 0;

// 02. Time base cache
// export const revalidate = 3; // Every 3 second disable cache disabled

// 03. On demand
// import { revalidatePath } from 'next/cache';
// revalidatePath('/snippets');

// This is a server component
export default async function Home() {
  const snippets = await db.snipet.findMany();

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        href={`/snippets/${snippet.id}`}
        className="flex justify-between items-center p-2 border rounded"
      >
        <div>{snippet.title}</div>
        <div>View</div>
      </Link>
    );
  });

  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link href="/snippets/new" className="border p-2 rounded">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}
