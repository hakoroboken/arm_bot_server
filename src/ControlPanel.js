function ControlPanel({ publishPoint }) {
  const baseStyle = {
    fontSize: '30px',
    padding: '40px 70px',
    width: '230px',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer'
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <button
        onClick={() => publishPoint(1, 0, 0)}
        style={{ ...baseStyle, backgroundColor: '#4CAF50' }}
      >
        START
      </button>

      <button
        onClick={() => publishPoint(-1, 0, 0)}
        style={{ ...baseStyle, backgroundColor: '#f44336' }}
      >
        STOP
      </button>

      <button
        onClick={() => publishPoint(5, 5, 5)}
        style={{ ...baseStyle, backgroundColor: '#3652f4' }}
      >
        RESET
      </button>
    </div>
  );
}

export default ControlPanel;