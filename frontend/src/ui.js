// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';

import { APICallNode } from './nodes/apiCallNode';
import { FilterNode } from './nodes/filterNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  apiCall: APICallNode,
  filter: FilterNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  deleteNode: state.deleteNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }


    const onDragOver = useCallback((event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }, []);

    // Listen for node selection to show delete button
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const deleteNode = useStore((state) => state.deleteNode);
    useEffect(() => {
      const handleKeyDown = (e) => {
        if ((e.key === 'Delete' || e.key === 'Backspace') && selectedNodeId) {
          deleteNode(selectedNodeId);
          setSelectedNodeId(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedNodeId, deleteNode]);

    const onNodeClick = useCallback((event, node) => {
      setSelectedNodeId(node.id);
    }, []);

    // Add the missing onDrop callback
    const onDrop = useCallback(
      (event) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        if (event?.dataTransfer?.getData('application/reactflow')) {
          const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
          const type = appData?.nodeType;
          // check if the dropped element is valid
          if (typeof type === 'undefined' || !type) {
            return;
          }

          const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          });

          const nodeID = getNodeID(type);
          const newNode = {
            id: nodeID,
            type,
            position,
            data: getInitNodeData(nodeID, type),
          };

          addNode(newNode);
        }
      },
      [reactFlowInstance, getNodeID, addNode]
    );

    return (
      <>
        <div ref={reactFlowWrapper} style={{ width: '100vw', height: '70vh' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onInit={setReactFlowInstance}
            nodeTypes={nodeTypes}
            proOptions={proOptions}
            snapGrid={[gridSize, gridSize]}
            connectionLineType="smoothstep"
            onNodeClick={onNodeClick}
          >
            <Background color="#aaa" gap={gridSize} />
            <Controls />
            <MiniMap
              nodeColor={(n) =>
                n.id === selectedNodeId
                  ? '#38bdf8' // Highlight selected node in blue
                  : '#e3e3e3' // Default color for other nodes
              }
            />
          </ReactFlow>
          {/* Delete Node button removed as requested */}
        </div>
      </>
    );
}
