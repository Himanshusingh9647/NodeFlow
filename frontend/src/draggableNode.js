// draggableNode.js


const nodeTypeStyles = {
  customInput: {
    borderLeft: '5px solid #38bdf8',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#38bdf8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="9" width="8" height="2" rx="1"/><rect x="9" y="5" width="8" height="2" rx="1"/><rect x="9" y="13" width="8" height="2" rx="1"/></svg>
    ),
    color: '#e3e3e3',
  },
  llm: {
    borderLeft: '5px solid #7c3aed',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#7c3aed" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7.5 4.5c-2 0-3.5 1.5-3.5 3.5 0 1.2.7 2.2 1.7 2.8-.1.3-.2.7-.2 1 0 1.1.9 2 2 2 .2 0 .4 0 .6-.1.3.7 1 1.2 1.9 1.2.8 0 1.5-.5 1.8-1.2.2.1.4.1.6.1 1.1 0 2-.9 2-2 0-.3-.1-.7-.2-1 1-.6 1.7-1.6 1.7-2.8 0-2-1.5-3.5-3.5-3.5-.7 0-1.3.2-1.8.6-.5-.4-1.1-.6-1.8-.6z" />
      </svg>
    ),
    color: '#e3e3e3',
  },
  customOutput: {
    borderLeft: '5px solid #22d3ee',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#22d3ee" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="9" width="8" height="2" rx="1"/><rect x="9" y="5" width="8" height="2" rx="1"/><rect x="9" y="13" width="8" height="2" rx="1"/></svg>
    ),
    color: '#e3e3e3',
  },
  text: {
    borderLeft: '5px solid #ea580c',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#ea580c" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="12" height="12" rx="2"/><path d="M7 8h6M7 12h4"/></svg>
    ),
    color: '#e3e3e3',
  },
  apiCall: {
    borderLeft: '5px solid #f59e42',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#f59e42" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="9" width="8" height="2" rx="1"/><rect x="9" y="5" width="8" height="2" rx="1"/><rect x="9" y="13" width="8" height="2" rx="1"/><circle cx="16" cy="10" r="2.2"/></svg>
    ),
    color: '#e3e3e3',
  },
  filter: {
    borderLeft: '5px solid #10b981',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#10b981" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h12M6 8h8M8 12h4M10 16h0"/></svg>
    ),
    color: '#e3e3e3',
  },
};

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const style = nodeTypeStyles[type] || {};

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        minWidth: '90px',
        height: '54px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '12px',
        background: 'rgba(40,44,52,0.55)',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: '0 18px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        color: style.color,
        fontWeight: 600,
        fontSize: '1.08em',
        border: '1.5px solid rgba(255,255,255,0.18)',
        marginBottom: '2px',
        marginRight: '2px',
        userSelect: 'none',
        ...style,
      }}
      draggable
    >
      <span style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        fontSize: '1.25em',
        marginRight: 12,
        background: 'rgba(255,255,255,0.08)',
        borderRadius: 6,
      }}>{style.icon}</span>
      <span>{label}</span>
    </div>
  );
};
