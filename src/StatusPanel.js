function StatusPanel({ position, connected }) {
  const cardStyle = {
    backgroundColor: '#1e1e1e',
    padding: '20px 30px',
    borderRadius: '15px',
    boxShadow: '0 0px 0px rgba(26, 35, 192, 0.74)',
    minWidth: '250px'
  };

  const titleStyle = {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#aaa'
  };

  const valueStyle = {
    fontSize: '28px',
    margin: '5px 0'
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: '900px',
        marginBottom: '40px',
        gap : '50px'
      }}
    >
      {/* 左：カード化した自己位置 */}
      <div style={cardStyle}>
        <div style={titleStyle}>自己位置</div>
        <div style={valueStyle}>x: {position.x}</div>
        <div style={valueStyle}>y: {position.y}</div>
        <div style={valueStyle}>角度: {position.r}</div>
      </div>

      {/* 右：接続状態（こっちもカードにしても良い） */}
      <div style={cardStyle}>
        <div style={titleStyle}>接続状態</div>
        <div style={{
          fontSize: '22px',
          color: connected ? '#4CAF50' : '#f44336'
        }}>
          {connected ? '🟢接続済み' : '🔴切断'}
        </div>
      </div>
    </div>
  );
}

export default StatusPanel;