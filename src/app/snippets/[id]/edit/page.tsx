import SnippetEditForm from '@/components/snippet-edit-form';
import { db } from '@/db';
import { notFound } from 'next/navigation';

interface SnippetEditPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
  const id = parseInt(props.params.id);

  const snippet = await db.snipet.findFirst({
    where: { id },
  });

  if (!snippet) notFound();

  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
