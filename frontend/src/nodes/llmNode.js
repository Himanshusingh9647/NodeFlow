// llmNode.js

import React from 'react';
import BaseNode from './BaseNode';
import { Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      inputHandles={[
        { id: `${id}-system`, position: Position.Left, style: { top: `${100/3}%` } },
        { id: `${id}-prompt`, position: Position.Left, style: { top: `${200/3}%` } }
      ]}
      outputHandles={[{ id: `${id}-response`, position: Position.Right }]}
    >
      <span>This is a LLM.</span>
    </BaseNode>
  );
};
