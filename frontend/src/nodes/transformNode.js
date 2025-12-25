import React, { useState } from 'react';
import BaseNode from './BaseNode';
import { Position } from 'reactflow';

export const TransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'uppercase');
  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      inputHandles={[{ id: `${id}-input`, position: Position.Left }]}
      outputHandles={[{ id: `${id}-output`, position: Position.Right }]}
    >
      <label>
        Operation:
        <select value={operation} onChange={e => setOperation(e.target.value)}>
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="reverse">Reverse</option>
        </select>
      </label>
    </BaseNode>
  );
};
