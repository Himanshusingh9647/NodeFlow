// submit.js

import React, { useState } from 'react';
import { useReactFlow } from 'reactflow';

export const SubmitButton = () => {
    const { getNodes, getEdges } = useReactFlow();
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        setAlert(null);
        try {
            const nodes = getNodes().map(n => ({ id: n.id, data: n.data }));
            const edges = getEdges().map(e => ({ id: e.id, source: e.source, target: e.target }));
            const res = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges })
            });
            const data = await res.json();
            setAlert({ type: 'success', message: `Nodes: ${data.num_nodes}, Edges: ${data.num_edges}, DAG: ${data.is_dag ? 'Yes' : 'No'}` });
        } catch (err) {
            setAlert({ type: 'error', message: 'Failed to check pipeline.' });
        }
        setLoading(false);
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12}}>
            <button
                type="button"
                onClick={handleSubmit}
                style={{
                    background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 28px', fontWeight: 600, fontSize: '1em', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, boxShadow: '0 2px 8px rgba(99,102,241,0.08)'
                }}
                disabled={loading}
            >
                {loading ? 'Checking...' : 'Submit'}
            </button>
            {alert && (
                <div style={{
                    background: alert.type === 'success' ? '#e0f7fa' : '#fee2e2',
                    color: alert.type === 'success' ? '#047481' : '#b91c1c',
                    border: `1px solid ${alert.type === 'success' ? '#b2ebf2' : '#fecaca'}`,
                    borderRadius: 6,
                    padding: '10px 18px',
                    marginTop: 8,
                    fontWeight: 500,
                    minWidth: 220,
                    textAlign: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}>
                    {alert.message}
                </div>
            )}
        </div>
    );
}
