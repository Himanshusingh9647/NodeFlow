// outputNode.js

import React, { useState } from 'react';
import BaseNode from './BaseNode';
import { Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setOutputType(e.target.value);

  // Simulated output value (replace with actual output if available)
  const outputValue = data.value || '';

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      inputHandles={[{ id: `${id}-value`, position: Position.Left }]}
      outputHandles={[{ id: `${id}-output`, position: Position.Right }]}
    >
      <label>
        Name:
        <input type="text" value={currName} onChange={handleNameChange} />
      </label>
      <label>
        Type:
        <select value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
      <div className="output-value-glass">
        {outputType === 'Text' ? (
          <pre style={{ margin: 0, fontSize: '1em', fontFamily: 'inherit', color: '#e3e3e3', wordBreak: 'break-word' }}>{outputValue || 'No output yet.'}</pre>
        ) : (
          outputValue ? <img src={outputValue} alt="Output" style={{ maxWidth: '100%', borderRadius: '8px' }} /> : <span style={{ color: '#888' }}>No image output.</span>
        )}
      </div>
    </BaseNode>
  );
};
