// This is a client component
'use client';

import { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import type { Snipet } from '@prisma/client';
import { editSnippet } from '@/actions';

interface SnippetEditForm {
  snippet: Snipet;
}

export default function SnippetEditForm({ snippet }: SnippetEditForm) {
  const [code, setCode] = useState(snippet.code);

  const handleEditorChange = (value: string = '') => {
    setCode(value);
  };

  const editSnippetAction = editSnippet.bind(null, snippet.id, code);

  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={code}
        options={{
          minimap: { enabled: false },
        }}
        onChange={handleEditorChange}
      />

      <form action={editSnippetAction}>
        <button type="submit" className="p-2 border rounded">
          Save
        </button>
      </form>
    </div>
  );
}
