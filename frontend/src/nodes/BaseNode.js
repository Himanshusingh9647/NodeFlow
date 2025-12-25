import React from 'react';
import { Handle } from 'reactflow';
import './nodeStyles.css';


import { useStore } from '../store';

const BaseNode = ({ id, data, title, inputHandles = [], outputHandles = [], children }) => {
  const deleteNode = useStore((state) => state.deleteNode);
  return (
    <div className="base-node">
      <div className="base-node-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ marginLeft: '16px' }}>{title}</span>
        <button
          aria-label="Delete node"
          style={{
            background: 'none',
            border: 'none',
            color: '#f87171',
            fontWeight: 700,
            fontSize: '1.15em',
            cursor: 'pointer',
            marginLeft: '6px',
            marginRight: '6px',
            marginTop: '2px',
            padding: 0,
            lineHeight: 1,
            position: 'relative',
            left: '-2px',
          }}
          onClick={() => deleteNode(id)}
        >
          ×
        </button>
      </div>
      {inputHandles.map((handle, idx) => (
        <Handle
          key={`input-${idx}`}
          type="target"
          position={handle.position || 'left'}
          id={handle.id}
          style={handle.style}
        />
      ))}
      <div className="base-node-content">{children}</div>
      {outputHandles.map((handle, idx) => (
        <Handle
          key={`output-${idx}`}
          type="source"
          position={handle.position || 'right'}
          id={handle.id}
          style={handle.style}
        />
      ))}
    </div>
  );
};

export default BaseNode;
