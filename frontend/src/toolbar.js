// toolbar.js

import { DraggableNode } from './draggableNode';


export const PipelineToolbar = () => {
    return (
        <div style={{
            padding: '18px 0 10px 0',
            background: '#181A20',
            borderBottom: '1.5px solid #23272f',
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 20
        }}>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '18px',
                alignItems: 'center',
                maxWidth: '900px',
                width: '100%',
                justifyContent: 'center',
            }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='apiCall' label='API Call' />
                <DraggableNode type='filter' label='Filter' />
            </div>
        </div>
    );
};
