// textNode.js

import React, { useState, useRef, useEffect } from 'react';
import BaseNode from './BaseNode';
import { Position } from 'reactflow';

// Helper to extract unique variables in {{var}} format
const extractVariables = (text) => {
  const regex = /{{\s*([\w.]+)\s*}}/g;
  const vars = new Set();
  let match;
  while ((match = regex.exec(text))) {
    vars.add(match[1]);
  }
  return Array.from(vars);
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState(() => extractVariables(data?.text || '{{input}}'));
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [currText]);

  // Update variables when text changes
  useEffect(() => {
    setVariables(extractVariables(currText));
  }, [currText]);

  const handleTextChange = (e) => setCurrText(e.target.value);

  // Create a handle for each variable
  const inputHandles = variables.map((v, idx) => ({
    id: `${id}-var-${v}`,
    position: Position.Left,
    style: { top: `${40 + idx * 28}px` }, // space handles vertically
    name: v
  }));

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      inputHandles={inputHandles}
      outputHandles={[{ id: `${id}-output`, position: Position.Right }]}
    >
      <label>
        Text:
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          rows={1}
          style={{ resize: 'none', overflow: 'hidden', minHeight: 32, fontFamily: 'inherit', fontSize: '1em' }}
        />
      </label>
    </BaseNode>
  );
};
