import React, { useState } from 'react';
import BaseNode from './BaseNode';
import { Position } from 'reactflow';

export const DatabaseNode = ({ id, data }) => {
  const [table, setTable] = useState(data?.table || 'users');
  return (
    <BaseNode
      id={id}
      data={data}
      title="Database"
      inputHandles={[{ id: `${id}-query`, position: Position.Left }]}
      outputHandles={[{ id: `${id}-result`, position: Position.Right }]}
    >
      <label>
        Table:
        <input type="text" value={table} onChange={e => setTable(e.target.value)} />
      </label>
    </BaseNode>
  );
};
