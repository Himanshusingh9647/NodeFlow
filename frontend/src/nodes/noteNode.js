import React, { useState } from 'react';
import BaseNode from './BaseNode';
import { Position } from 'reactflow';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || '');
  return (
    <BaseNode
      id={id}
      data={data}
      title="Note"
      inputHandles={[]}
      outputHandles={[]}
    >
      <label>
        Note:
        <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} />
      </label>
    </BaseNode>
  );
};
