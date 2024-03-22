# NextJS 14 - Practice with caching

This is a NextJS application with proper handling caching.

- run developement application - `npm run dev`
- build the application - `npm run build`
- run built application - `npm run start`

---

### NextJS caching disabled

1. Disable cache entirely on our Home page - When define this, this route becomes a dynamic route

   - First method `export const dynamic = 'force-dynamic';`
   - Second method `export const revalidate = 0;`
   - We have to include above code relavent file

2. Time base cache

   - `export const revalidate = 3; // Every 3 second disable cache disabled`
   - We have to include above code relavent file

3. On demand cache
   - `import { revalidatePath } from 'next/cache';`
   - `revalidatePath('/snippets');`
   - check the `\src\actions\index.ts` file for usage

---

### Disable caching properly on the dyncamic route

- When we have a dynamic route ( `because of the [id]` ).
- When we build the production, next identify this dynamic route
- So it renders everytime, because dynamic page's caches are disable.
- It's not a better idea always, because it will cause a unnecessary delay
- We can already build each dynamic pages one by one, while bulding process.
- Then our server already has built each dynamic pages.
- When click each dynamic page, it renders already built pages (Caching)
- So we can improve page performance because of this cahing mechanism
- To do this, we have to write below functionality, end of the dynamic `page.tsx` file.
- then it will automatically build the cache during the build time.

```
export async function generateStaticParams() {
  const snippets = await db.snipet.findMany();

  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}
```
