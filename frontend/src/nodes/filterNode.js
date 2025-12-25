import React, { useState } from 'react';
import BaseNode from './BaseNode';
import { Position } from 'reactflow';

export const FilterNode = ({ id, data }) => {
  const [keyword, setKeyword] = useState(data?.keyword || '');
  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      inputHandles={[{ id: `${id}-input`, position: Position.Left }]}
      outputHandles={[{ id: `${id}-output`, position: Position.Right }]}
    >
      <label>
        Keyword:
        <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} />
      </label>
    </BaseNode>
  );
};
