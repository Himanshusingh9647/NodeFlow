import React, { useState } from 'react';
import BaseNode from './BaseNode';
import { Position } from 'reactflow';

export const APICallNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');
  return (
    <BaseNode
      id={id}
      data={data}
      title="API Call"
      inputHandles={[{ id: `${id}-input`, position: Position.Left }]}
      outputHandles={[{ id: `${id}-output`, position: Position.Right }]}
    >
      <label>
        URL:
        <input type="text" value={url} onChange={e => setUrl(e.target.value)} />
      </label>
    </BaseNode>
  );
};
